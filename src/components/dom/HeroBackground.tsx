"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  varying vec2 vUv;

  // Simplex 2D noise
  vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
  float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
    -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

  // Star generation function
  float rand(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
    vec2 uv = vUv;

    // Correct aspect ratio for circular stars
    float aspect = uResolution.x / uResolution.y;
    vec2 aspectUV = uv;
  aspectUV.x *= aspect;

    // Mouse influence
    float mouseDist = distance(uv, uMouse);
    float mouseInteraction = smoothstep(0.4, 0.0, mouseDist);

    // Space Background (Deep Void) - Transparency enabled
    vec3 spaceColor = vec3(0.0, 0.0, 0.0);

    // Nebula Layer (Fluid domain warping)
    float n1 = snoise(uv * 2.0 + uTime * 0.05);
    float n2 = snoise(uv * 4.0 - uTime * 0.1 + n1 * 1.5 + mouseInteraction * 0.3);
    float n3 = snoise(uv * 8.0 + uTime * 0.15 + n2 * 0.5);

    // Nebula Colors
    // Nebula Colors - Updated to match Global Theme (Cyan/Teal)
    vec3 nebulaColor1 = vec3(0.0, 0.2, 0.3);   // Dark Teal
    vec3 nebulaColor2 = vec3(0.0, 0.6, 0.7);   // Cyan/Blue
    vec3 nebulaColor3 = vec3(0.0, 0.1, 0.2);   // Deep Blue

    // Mix Nebula
    float mix1 = smoothstep(-0.5, 0.8, n2);
    float mix2 = smoothstep(-0.8, 0.6, n3);
    
    vec3 nebula = mix(nebulaColor1, nebulaColor2, mix1);
  nebula = mix(nebula, nebulaColor3, mix2 * 0.5);

    // Add Nebula to Background
    // Mask nebula so it's not everywhere (clouds in space)
    float nebulaMask = smoothstep(0.3, 0.7, n1 * 0.5 + 0.5); 
    vec3 finalColor = mix(spaceColor, nebula, nebulaMask * 0.6); // Slightly reduced intensity

    // ===== STARS LAYER - REMOVED COMPLETELY =====
    float stars = 0.0;
    
    // Layers 1-4 completely commented out to remove "dark circles" artifact
    /*
    // ===== Layer 1: Tiny Distant Dots (Very Common) =====
    vec2 starUV1 = aspectUV * 35.0;
    // ... (logic removed)
    */
    vec2 starUV1 = aspectUV * 35.0;
    vec2 id1 = floor(starUV1);
    /*
    vec2 pos1 = fract(starUV1) - 0.5;
    float r1 = rand(id1);
    
    if (r1 > 0.88) { // 12% density - more stars
        float dist1 = length(pos1);
        // Ultra-sharp tiny dots
        float dotSize = 0.018 + rand(id1 + 10.0) * 0.012;
        float dot = 1.0 - smoothstep(0.0, dotSize, dist1);
        // Subtle twinkle
        float blink1 = 0.6 + 0.4 * sin(uTime * (1.0 + r1 * 2.0) + r1 * 100.0);
        stars += dot * blink1 * 0.6;
    }

    // ===== Layer 2: Small 4-Point Cross Stars =====
    vec2 starUV2 = aspectUV * 18.0;
    vec2 id2 = floor(starUV2);
    vec2 pos2 = fract(starUV2) - 0.5;
    float r2 = rand(id2 + 42.0);
    
    if (r2 > 0.94) { // 6% density - more cross stars
        // Create 4-point star (cross/plus shape)
        float dist2 = length(pos2);
        vec2 absPos2 = abs(pos2);
        
        // Sharp rays in + pattern
        float rayThickness2 = 0.008;
        float rayLength2 = 0.06 + rand(id2 + 20.0) * 0.02;
        
        // Horizontal and vertical rays
        float crossShape2 = 0.0;
        crossShape2 += (1.0 - smoothstep(0.0, rayThickness2, absPos2.y)) * (1.0 - smoothstep(0.0, rayLength2, absPos2.x));
        crossShape2 += (1.0 - smoothstep(0.0, rayThickness2, absPos2.x)) * (1.0 - smoothstep(0.0, rayLength2, absPos2.y));
        
        // Bright center point
        float center2 = 1.0 - smoothstep(0.0, 0.02, dist2);
        
        // Subtle glow
        float glow2 = (1.0 - smoothstep(0.0, rayLength2 * 1.8, dist2)) * 0.15;
        
        // Gentle twinkle
        float blink2 = 0.7 + 0.3 * sin(uTime * 1.5 + r2 * 50.0);
        
        stars += (crossShape2 + center2 + glow2) * blink2 * 0.8;
    }

    // ===== Layer 3: Medium 4-Point Cross Stars (Brighter) =====
    vec2 starUV3 = aspectUV * 12.0;
    vec2 id3 = floor(starUV3);
    vec2 pos3 = fract(starUV3) - 0.5;
    float r3 = rand(id3 + 123.0);
    
    if (r3 > 0.96) { // 4% density
        // Create larger 4-point star
        float dist3 = length(pos3);
        vec2 absPos3 = abs(pos3);
        
        // Longer, sharper rays
        float rayThickness3 = 0.01;
        float rayLength3 = 0.09 + rand(id3 + 30.0) * 0.03;
        
        // Horizontal and vertical rays
        float crossShape3 = 0.0;
        crossShape3 += (1.0 - smoothstep(0.0, rayThickness3, absPos3.y)) * (1.0 - smoothstep(0.0, rayLength3, absPos3.x));
        crossShape3 += (1.0 - smoothstep(0.0, rayThickness3, absPos3.x)) * (1.0 - smoothstep(0.0, rayLength3, absPos3.y));
        
        // Bright center
        float center3 = 1.0 - smoothstep(0.0, 0.03, dist3);
        
        // Soft glow
        float glow3 = (1.0 - smoothstep(0.0, rayLength3 * 2.0, dist3)) * 0.2;
        
        // Subtle twinkle
        float blink3 = 0.75 + 0.25 * sin(uTime * 1.2 + r3 * 40.0);
        
        stars += (crossShape3 + center3 + glow3) * blink3 * 1.1;
    }

    // ===== Layer 4: Large Rare 4-Point Cross Stars (Brightest) =====
    vec2 starUV4 = aspectUV * 8.0 + vec2(uTime * 0.005, 0.0);
    vec2 id4 = floor(starUV4);
    vec2 pos4 = fract(starUV4) - 0.5;
    float r4 = rand(id4 + 250.0);
    
    if (r4 > 0.98) { // 2% density - rare bright stars
        // Create large prominent 4-point star
        float dist4 = length(pos4);
        vec2 absPos4 = abs(pos4);
        
        // Long sharp rays
        float rayThickness4 = 0.012;
        float rayLength4 = 0.12 + rand(id4 + 50.0) * 0.04;
        
        // Horizontal and vertical rays
        float crossShape4 = 0.0;
        crossShape4 += (1.0 - smoothstep(0.0, rayThickness4, absPos4.y)) * (1.0 - smoothstep(0.0, rayLength4, absPos4.x));
        crossShape4 += (1.0 - smoothstep(0.0, rayThickness4, absPos4.x)) * (1.0 - smoothstep(0.0, rayLength4, absPos4.y));
        
        // Very bright center
        float center4 = 1.0 - smoothstep(0.0, 0.035, dist4);
        
        // Larger glow
        float glow4 = (1.0 - smoothstep(0.0, rayLength4 * 2.5, dist4)) * 0.25;
        
        // Very subtle twinkle
        float blink4 = 0.85 + 0.15 * sin(uTime * 0.9 + r4 * 30.0);
        
        stars += (crossShape4 + center4 + glow4) * blink4 * 1.4;
    }
    */

    // Combine stars with background
    // finalColor += vec3(stars); // Stars removed as per user request

    // Calculate Alpha - Only show pixels where there is content (stars or nebula)
    float alpha = nebulaMask * 0.5 + smoothstep(0.0, 0.1, stars); 
    
    // Clamp alpha
    alpha = clamp(alpha, 0.0, 1.0);

    gl_FragColor = vec4(finalColor, alpha);
}
`;

export default function HeroBackground() {
  const mesh = useRef<THREE.Mesh>(null);
  const { viewport, size } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
    }),
    []
  );

  useFrame((state) => {
    if (mesh.current) {
      (mesh.current.material as THREE.ShaderMaterial).uniforms.uTime.value =
        state.clock.getElapsedTime();

      // Convert mouse from -1..1 to 0..1 for UVs
      const mouseX = (state.mouse.x + 1) / 2;
      const mouseY = (state.mouse.y + 1) / 2;

      // Lerp mouse for smooth interaction
      const currentMouse = (mesh.current.material as THREE.ShaderMaterial).uniforms.uMouse.value;
      currentMouse.x = THREE.MathUtils.lerp(currentMouse.x, mouseX, 0.1);
      currentMouse.y = THREE.MathUtils.lerp(currentMouse.y, mouseY, 0.1);
    }
  });

  return (
    <mesh ref={mesh} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}
