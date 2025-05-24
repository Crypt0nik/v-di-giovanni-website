import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Group } from 'three';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Container simple
const BagContainer = styled(motion.div)`
  width: 300px;
  height: 300px;
  margin: 0 auto;
  border-radius: 20px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  filter: drop-shadow(0 20px 40px rgba(0,0,0,0.1));
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    width: 250px;
    height: 250px;
  }

  @media (max-width: 480px) {
    width: 200px;
    height: 200px;
  }
`;

// Simple sac 3D qui fonctionne toujours
const SimpleBag3D: React.FC = () => {
  const bagRef = useRef<Group>(null);
  
  useFrame(() => {
    if (bagRef.current) {
      bagRef.current.rotation.y += 0.02;
    }
  });

  return (
    <group ref={bagRef}>
      {/* Corps du sac */}
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[1.5, 1, 0.8]} />
        <meshStandardMaterial color="#D2691E" roughness={0.3} />
      </mesh>
      
      {/* Rabat */}
      <mesh position={[0, 0.3, 0.5]} rotation={[-0.3, 0, 0]}>
        <boxGeometry args={[1.4, 0.8, 0.1]} />
        <meshStandardMaterial color="#FF8C00" roughness={0.3} />
      </mesh>
      
      {/* Anses */}
      <mesh position={[-0.6, 0.8, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.8, 8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[0.6, 0.8, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.8, 8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
    </group>
  );
};

const HeroBag3DSimple: React.FC = () => {
  return (
    <BagContainer
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <Canvas
        camera={{ position: [2, 1, 3], fov: 45 }}
        style={{ background: 'transparent', width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <SimpleBag3D />
      </Canvas>
    </BagContainer>
  );
};

export default HeroBag3DSimple;
