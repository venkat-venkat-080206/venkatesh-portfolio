"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  uniform float uTime;
  uniform vec2 uTrailPositions[30];
  uniform float uTrailAges[30];
  uniform float uTrailVelocities[30];
  varying vec2 vUv;
  varying float vDistortion;

  void main() {
    vUv = uv;
    vec3 pos = position;
    
    float totalDistortion = 0.0;
    
    // Calculate distortion strength based on cursor trail history
    for(int i = 0; i < 30; i++) {
      float age = uTrailAges[i];
      if (age <= 0.0) continue;
      
      vec2 trailPos = uTrailPositions[i];
      float velocity = uTrailVelocities[i];
      
      // Distance from this vertex to trail point
      float dist = distance(uv, trailPos);
      
      // Create smooth ripple waves
      float ripple = sin(dist * 25.0 - uTime * 5.0);
      
      // Fade by distance - smaller, tighter waves
      float fadeByDist = smoothstep(0.25, 0.0, dist);
      float fadeByAge = 1.0 - age; // Newer = stronger
      
      // Velocity affects wave SIZE (not width)
      // Faster = bigger waves, slower = smaller waves
      float waveSize = velocity * 4.0 + 0.3; // Reduced sizing
      
      // Calculate distortion strength (weightage)
      // More visible without being wider
      float distortion = ripple * fadeByDist * fadeByAge * waveSize * 0.05;
      
      totalDistortion += distortion;
    }
    
    vDistortion = totalDistortion;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uBackgroundTexture;
  uniform vec2 uResolution;
  varying vec2 vUv;
  varying float vDistortion;

  void main() {
    // Calculate UV offset based on distortion
    // This creates the refraction effect
    vec2 distortedUV = vUv;
    
    // Apply distortion in both X and Y for organic wave movement
    float distortionStrength = vDistortion * 0.05; // Control strength
    distortedUV.x += vDistortion * 0.05;
    distortedUV.y += vDistortion * 0.03;
    
    // Clamp UVs to prevent sampling outside texture
    distortedUV = clamp(distortedUV, 0.0, 1.0);
    
    // Sample the background with distorted UVs
    vec4 bgColor = texture2D(uBackgroundTexture, distortedUV);
    
    // Output pure refraction - no color added
    gl_FragColor = bgColor;
  }
`;

interface TrailPoint {
    pos: THREE.Vector2;
    age: number;
    velocity: number;
}

const MAX_TRAIL_POINTS = 30;

export default function WaveDisplacementLayer() {
    const mesh = useRef<THREE.Mesh>(null);
    const { viewport, gl, scene, camera } = useThree();
    const trailHistory = useRef<TrailPoint[]>([]);
    const lastMousePos = useRef<THREE.Vector2>(new THREE.Vector2(0.5, 0.5));
    const frameCount = useRef(0);

    // Render target for background capture
    const renderTarget = useMemo(
        () =>
            new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, {
                minFilter: THREE.LinearFilter,
                magFilter: THREE.LinearFilter,
                format: THREE.RGBAFormat,
            }),
        []
    );

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uBackgroundTexture: { value: renderTarget.texture },
            uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
            uTrailPositions: { value: Array(MAX_TRAIL_POINTS).fill(new THREE.Vector2(0, 0)) },
            uTrailAges: { value: Array(MAX_TRAIL_POINTS).fill(0) },
            uTrailVelocities: { value: Array(MAX_TRAIL_POINTS).fill(0) },
        }),
        [renderTarget]
    );

    useFrame((state) => {
        if (mesh.current) {
            // Hide wave mesh temporarily
            mesh.current.visible = false;

            // Render background to texture
            gl.setRenderTarget(renderTarget);
            gl.render(scene, camera);
            gl.setRenderTarget(null);

            // Show wave mesh again
            mesh.current.visible = true;

            const material = mesh.current.material as THREE.ShaderMaterial;
            material.uniforms.uTime.value = state.clock.getElapsedTime();

            // Convert mouse from -1..1 to 0..1
            const mouseX = (state.mouse.x + 1) / 2;
            const mouseY = (state.mouse.y + 1) / 2;

            const currentMouse = new THREE.Vector2(mouseX, mouseY);

            // Calculate velocity from mouse movement
            const velocity = currentMouse.distanceTo(lastMousePos.current);

            frameCount.current++;

            // Add trail point when mouse is moving
            if (velocity > 0.0005) {
                const newPoint: TrailPoint = {
                    pos: currentMouse.clone(),
                    age: 0,
                    velocity: Math.min(velocity * 50, 2.0), // Cap max velocity effect
                };

                trailHistory.current.push(newPoint);

                if (trailHistory.current.length > MAX_TRAIL_POINTS) {
                    trailHistory.current.shift();
                }
            }

            // Update trail ages and uniforms
            for (let i = 0; i < MAX_TRAIL_POINTS; i++) {
                if (i < trailHistory.current.length) {
                    const point = trailHistory.current[i];
                    point.age += 0.012; // Slower fade for smoother effect

                    material.uniforms.uTrailPositions.value[i] = point.pos.clone();
                    material.uniforms.uTrailAges.value[i] = Math.min(point.age, 1.0);
                    material.uniforms.uTrailVelocities.value[i] = point.velocity;
                } else {
                    material.uniforms.uTrailAges.value[i] = 0;
                }
            }

            // Remove fully faded trails
            trailHistory.current = trailHistory.current.filter((p) => p.age < 1.0);

            lastMousePos.current = currentMouse;
        }
    });

    return (
        <mesh ref={mesh} scale={[viewport.width, viewport.height, 1]} position={[0, 0, 0.1]}>
            <planeGeometry args={[1, 1, 128, 128]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent={true}
            />
        </mesh>
    );
}
