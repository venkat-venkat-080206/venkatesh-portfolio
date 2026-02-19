"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { Trail } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

export default function CursorTrail() {
    const { viewport } = useThree();
    const ref = useRef<THREE.Mesh>(null);

    // Create a "target" position for the interpolation (weight effect)
    const targetPos = useMemo(() => new THREE.Vector3(), []);
    const currentPos = useMemo(() => new THREE.Vector3(), []);

    useFrame((state) => {
        if (!ref.current) return;

        // Convert mouse screen coords (-1..1) to distinct world coords
        // Viewport gives us the width/height in world units at z=0
        const x = (state.mouse.x * viewport.width) / 2;
        const y = (state.mouse.y * viewport.height) / 2;

        targetPos.set(x, y, 0);

        // Lerp current position to target for "weight"
        // Lower factor = heavier/slower (0.1 is good)
        currentPos.lerp(targetPos, 0.2);

        ref.current.position.copy(currentPos);
    });

    return (
        <>
            {/* Invisible leader mesh for the trail to follow */}
            <mesh ref={ref} position={[0, 0, 0]}>
                <circleGeometry args={[0.01, 12]} />
                <meshBasicMaterial visible={false} />
            </mesh>

            <Trail
                width={3}
                length={8}
                color={"#a0c4ff"}
                attenuation={(t) => t * t}
                target={ref as any}
            >
                <meshBasicMaterial
                    color={"#a0c4ff"}
                    transparent
                    opacity={0.6}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false} // Don't occlude
                />
            </Trail>
        </>
    );
}
