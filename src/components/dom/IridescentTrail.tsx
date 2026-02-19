"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uTrailPositions[60];
  uniform float uTrailAges[60];
  uniform float uTrailVelocities[60];
  uniform vec2 uResolution;
  varying vec2 vUv;
  varying vec3 vPosition;

  // Smooth HSV to RGB conversion for rainbow colors
  vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    vec2 aspectUV = uv;
    aspectUV.x *= aspect;
    
    vec3 finalColor = vec3(0.0);
    float totalAlpha = 0.0;
    
    // Draw flowing trail segments
    for(int i = 0; i < 59; i++) {
      float age = uTrailAges[i];
      if (age <= 0.0) continue;
      
      vec2 pos1 = uTrailPositions[i];
      vec2 pos2 = uTrailPositions[i + 1];
      float age2 = uTrailAges[i + 1];
      
      if (age2 <= 0.0) continue;
      
      float velocity = uTrailVelocities[i];
      
      // Adjust positions for aspect ratio
      vec2 aspectPos1 = pos1;
      vec2 aspectPos2 = pos2;
      aspectPos1.x *= aspect;
      aspectPos2.x *= aspect;
      
      // Calculate line segment
      vec2 lineDir = aspectPos2 - aspectPos1;
      float lineLength = length(lineDir);
      if (lineLength < 0.001) continue;
      
      lineDir = normalize(lineDir);
      vec2 toPoint = aspectUV - aspectPos1;
      
      // Project point onto line segment
      float t = clamp(dot(toPoint, lineDir) / lineLength, 0.0, 1.0);
      vec2 closestPoint = aspectPos1 + lineDir * t * lineLength;
      
      float distToLine = distance(aspectUV, closestPoint);
      
      // Speed-based thickness (faster = thicker trail)
      float thickness = 0.015 + velocity * 0.08;
      
      // Smooth falloff
      float influence = smoothstep(thickness, 0.0, distToLine);
      
      if (influence > 0.0) {
        // Age-based fade
        float ageFade = 1.0 - age;
        
        // Super smooth rainbow color transition
        // Reduced step for gradual color changes
        float hue = fract(float(i) * 0.015 + uTime * 0.05);
        vec3 rainbowColor = hsv2rgb(vec3(hue, 0.9, 1.0));
        
        // Very subtle shimmer for smooth effect
        float shimmer = sin(distToLine * 50.0 + uTime * 2.0) * 0.1 + 0.95;
        rainbowColor *= shimmer;
        
        // Combine
        float alpha = influence * ageFade * 0.8;
        finalColor += rainbowColor * alpha;
        totalAlpha += alpha;
      }
    }
    
    // Clamp alpha
    totalAlpha = min(totalAlpha, 1.0);
    
    gl_FragColor = vec4(finalColor, totalAlpha);
  }
`;

interface TrailPoint {
  pos: THREE.Vector2;
  age: number;
  velocity: number;
}

const MAX_TRAIL_POINTS = 60;

export default function IridescentTrail() {
  const mesh = useRef<THREE.Mesh>(null);
  const { viewport, size } = useThree();
  const trailHistory = useRef<TrailPoint[]>([]);
  const lastMousePos = useRef<THREE.Vector2>(new THREE.Vector2(0.5, 0.5));

  const uniforms = useRef({
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
    uTrailPositions: { value: Array(MAX_TRAIL_POINTS).fill(new THREE.Vector2(0, 0)) },
    uTrailAges: { value: Array(MAX_TRAIL_POINTS).fill(0) },
    uTrailVelocities: { value: Array(MAX_TRAIL_POINTS).fill(0) },
  });

  useFrame((state) => {
    if (mesh.current) {
      const material = mesh.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.getElapsedTime();

      // Convert mouse from -1..1 to 0..1
      const mouseX = (state.mouse.x + 1) / 2;
      const mouseY = (state.mouse.y + 1) / 2;
      const currentMouse = new THREE.Vector2(mouseX, mouseY);

      // Calculate velocity
      const velocity = currentMouse.distanceTo(lastMousePos.current);

      // Add trail point when moving (more frequent for ultra-smooth curves)
      if (velocity > 0.0001) {
        const newPoint: TrailPoint = {
          pos: currentMouse.clone(),
          age: 0,
          velocity: Math.min(velocity * 40, 1.5),
        };

        trailHistory.current.push(newPoint);

        if (trailHistory.current.length > MAX_TRAIL_POINTS) {
          trailHistory.current.shift();
        }
      }

      // Update ages
      for (let i = 0; i < MAX_TRAIL_POINTS; i++) {
        if (i < trailHistory.current.length) {
          const point = trailHistory.current[i];
          point.age += 0.02; // Faster fade for snappier effect

          material.uniforms.uTrailPositions.value[i] = point.pos.clone();
          material.uniforms.uTrailAges.value[i] = Math.min(point.age, 1.0);
          material.uniforms.uTrailVelocities.value[i] = point.velocity;
        } else {
          material.uniforms.uTrailAges.value[i] = 0;
        }
      }

      // Remove faded trails
      trailHistory.current = trailHistory.current.filter((p) => p.age < 1.0);

      lastMousePos.current = currentMouse;
    }
  });

  return (
    <mesh ref={mesh} scale={[viewport.width, viewport.height, 1]} position={[0, 0, 0.05]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms.current}
        transparent={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}
