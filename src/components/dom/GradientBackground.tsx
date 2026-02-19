"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  varying vec2 vUv;

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  void main() {
    vec2 uv = vUv;
    float ratio = uResolution.x / uResolution.y;
    vec2 centeredUv = vUv - 0.5;
    centeredUv.x *= ratio;

    // --- COLOR PALETTE ---
    vec3 colorBlack = vec3(0.002, 0.012, 0.015); 
    vec3 colorCyan  = vec3(0.0, 0.95, 0.92);      
    vec3 colorTeal  = vec3(0.0, 0.45, 0.42);      
    
    // --- LIGHT SOURCE 1: Increased oscillation speed ---
    vec2 lightPos1 = vec2(0.3 * ratio, -0.1); 
    lightPos1.x += sin(uTime * 0.8) * 0.08; // Doubled frequency
    lightPos1.y += cos(uTime * 0.6) * 0.08;
    
    float dist1 = length(centeredUv - lightPos1);
    float glow1 = exp(-dist1 * 3.5); 
    vec3 layer1 = colorCyan * glow1 * 0.75;

    // --- LIGHT SOURCE 2: Increased oscillation speed ---
    vec2 lightPos2 = vec2(-0.4 * ratio, -0.3);
    lightPos2.x += cos(uTime * 0.5) * 0.15;
    
    float dist2 = length(centeredUv - lightPos2);
    float glow2 = exp(-dist2 * 2.2);
    vec3 layer2 = colorTeal * glow2 * 0.4;

    vec3 finalColor = colorBlack;
    finalColor += layer1;
    finalColor += layer2;

    // Dithering for smoothness
    float dither = (random(vUv + fract(uTime)) - 0.5) * (1.0 / 255.0);
    finalColor += dither;

    finalColor = 1.0 - exp(-finalColor * 1.8);

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export default function GradientBackground() {
    const meshRef = useRef<THREE.Mesh>(null);
    const { viewport, size } = useThree();

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uResolution: { value: new THREE.Vector2(size.width, size.height) },
        }),
        []
    );

    // Handle Resize
    useFrame((state) => {
        if (meshRef.current) {
            // Update Resolution (handle window resize automatically via state.size)
            uniforms.uResolution.value.set(state.size.width, state.size.height);

            // Update Time - increment by 0.025 per frame as per snippet
            // Snippet uses explicit += 0.025, R3F uses delta or elapsedTime
            // To match snippet: uTime += 0.025
            uniforms.uTime.value += 0.025;
        }
    });

    return (
        <mesh ref={meshRef}>
            <planeGeometry args={[2, 2]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                depthWrite={false}
                depthTest={false}
            />
        </mesh>
    );
}
