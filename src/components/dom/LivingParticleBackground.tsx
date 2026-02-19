"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";

const vertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uPixelRatio;
  
  attribute float aSize;
  attribute vec3 aRandom;
  attribute vec3 aHome; 

  varying float vAlpha;
  varying vec3 vColor;

  // Simplex Noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  float snoise(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i  = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      i = mod289(i);
      vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
      vec4 j = p - 49.0 * floor(p * (1.0/49.0));
      vec4 x_ = floor(j * (1.0/7.0));
      vec4 y_ = floor(j - 7.0 * x_);
      vec4 x = x_ * (1.0/7.0) + 0.5/7.0;
      vec4 y = y_ * (1.0/7.0) + 0.5/7.0;
      vec4 h = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      return 42.0 * dot(m*m*m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
      vec3 pos = aHome;

      float n = snoise(vec3(pos.xy * 1.5, uTime * 0.3 + aRandom.x));
      pos.xyz += n * 0.12;
      float n2 = snoise(vec3(pos.xy * 4.0, uTime * 0.6));
      pos.xyz += n2 * 0.04;

      float distToMouse = distance(pos.xy, uMouse);
      float radius = 1.2;
      if(distToMouse < radius) {
          float force = pow(1.0 - (distToMouse / radius), 2.0);
          vec2 dir = normalize(pos.xy - uMouse);
          pos.xy += dir * force * 0.6;
      }

      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      
      float distFromCenter = length(pos.xyz);
      vAlpha = smoothstep(1.35, 0.75, distFromCenter) * 0.85;

      gl_PointSize = (aSize * uPixelRatio) * (1.4 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;

      vColor = mix(vec3(0.45, 0.92, 1.0), vec3(1.0), n * 0.5 + 0.5);
  }
`;

const fragmentShader = `
  varying float vAlpha;
  varying vec3 vColor;
  void main() {
      float dist = distance(gl_PointCoord, vec2(0.5));
      if (dist > 0.5) discard;
      float strength = 1.0 - (dist * 2.0);
      strength = pow(strength, 2.2); 
      gl_FragColor = vec4(vColor, strength * vAlpha);
  }
`;

export default function LivingParticleBackground() {
    const meshRef = useRef<THREE.Points>(null);

    // Use a ref for mouse coordinates to avoid re-renders and access in event listener
    const mouseRef = useRef(new THREE.Vector2(-10, -10));

    const particleCount = 22000;

    // Create particle data
    const { positions, home, sizes, randomness } = useMemo(() => {
        const posArray = new Float32Array(particleCount * 3);
        const homeArray = new Float32Array(particleCount * 3);
        const sizeArray = new Float32Array(particleCount);
        const randomArray = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            const r = 0.95 + Math.random() * 0.15;
            const theta = Math.random() * 2 * Math.PI;
            const phi = Math.acos(2 * Math.random() - 1);

            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);

            homeArray[i * 3] = x;
            homeArray[i * 3 + 1] = y;
            homeArray[i * 3 + 2] = z;

            posArray[i * 3] = x;
            posArray[i * 3 + 1] = y;
            posArray[i * 3 + 2] = z;

            sizeArray[i] = Math.random() * 5.0 + 2.0;
            randomArray[i * 3] = Math.random();
            randomArray[i * 3 + 1] = Math.random();
            randomArray[i * 3 + 2] = Math.random();
        }

        return {
            positions: posArray,
            home: homeArray,
            sizes: sizeArray,
            randomness: randomArray
        };
    }, []);

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(-10, -10) },
        uPixelRatio: { value: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1 }
    }), []);

    // MANUAL MOUSE TRACKING
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Calculate normalized device coordinates (-1 to +1)
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = -(e.clientY / window.innerHeight) * 2 + 1;

            // Apply scaling from original snippet to match effect strength
            mouseRef.current.set(x * 2.5, y * 1.5);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useFrame((state) => {
        if (meshRef.current && meshRef.current.material) {
            const material = meshRef.current.material as THREE.ShaderMaterial;

            // Update Time
            material.uniforms.uTime.value = state.clock.getElapsedTime();

            // Update Mouse from our ref (Global Window Tracking)
            material.uniforms.uMouse.value.copy(mouseRef.current);

            // Rotation
            const time = state.clock.getElapsedTime();
            meshRef.current.rotation.y = time * 0.08;
            meshRef.current.rotation.z = time * 0.03;
        }
    });

    return (
        <points ref={meshRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
                <bufferAttribute attach="attributes-aHome" args={[home, 3]} />
                <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
                <bufferAttribute attach="attributes-aRandom" args={[randomness, 3]} />
            </bufferGeometry>
            <shaderMaterial
                transparent
                blending={THREE.AdditiveBlending}
                depthWrite={false}
                uniforms={uniforms}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
            />
        </points>
    );
}
