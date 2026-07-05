'use client';

import { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Stars() {
  const meshRef = useRef<THREE.Points>(null);

  useEffect(() => {
    if (!meshRef.current) return;
    const count = 3000;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2000;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    meshRef.current.geometry = geometry;
  }, []);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.02;
      meshRef.current.rotation.x += delta * 0.005;
    }
  });

  return (
    <points ref={meshRef}>
      <pointsMaterial
        size={1.5}
        color="#ffcc66"
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function Starfield() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 500], fov: 60 }}>
        <Stars />
      </Canvas>
    </div>
  );
}
