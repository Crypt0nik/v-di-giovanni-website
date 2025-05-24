import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Group } from 'three';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const BagContainer = styled(motion.div)`
  width: 300px;
  height: 300px;
  margin: 0 auto;
  border-radius: 20px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  filter: drop-shadow(0 20px 40px rgba(0,0,0,0.1));

  @media (max-width: 768px) {
    width: 250px;
    height: 250px;
  }

  @media (max-width: 480px) {
    width: 200px;
    height: 200px;
  }
`;

// Sac 3D simple avec rotation
const RotatingBag3D: React.FC = () => {
  const bagRef = useRef<Group>(null);
  
  useFrame(() => {
    if (bagRef.current) {
      bagRef.current.rotation.y += 0.005; // Rotation plus lente
    }
  });

  return (
    <group ref={bagRef} position={[0, -0.3, 0]} scale={[1.2, 1.2, 1.2]}>
      {/* Corps principal du sac */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[1.8, 1.4, 1]} />
        <meshStandardMaterial color="#8B4513" roughness={0.3} />
      </mesh>
      
      {/* Rabat orange */}
      <mesh position={[0, 0.5, 0.6]} rotation={[-0.2, 0, 0]} castShadow>
        <boxGeometry args={[1.7, 1, 0.1]} />
        <meshStandardMaterial color="#FF8C00" roughness={0.2} />
      </mesh>
      
      {/* Anse gauche */}
      <mesh position={[-0.7, 1, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 1, 12]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      
      {/* Anse droite */}
      <mesh position={[0.7, 1, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 1, 12]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      
      {/* Partie arrondie du bas */}
      <mesh position={[0, -0.6, 0]} castShadow>
        <sphereGeometry args={[0.9, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#8B4513" roughness={0.3} />
      </mesh>
      
      {/* Fermoir */}
      <mesh position={[0, 0.3, 0.75]} castShadow>
        <cylinderGeometry args={[0.06, 0.06, 0.08, 8]} />
        <meshStandardMaterial color="#C0A062" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
};

const SimpleBag3D: React.FC = () => {
  return (
    <BagContainer
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <Canvas
        camera={{ position: [2.5, 1.5, 2.5], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        {/* Éclairage optimisé */}
        <ambientLight intensity={0.6} />
        <directionalLight 
          position={[3, 4, 2]} 
          intensity={0.8} 
          castShadow
          shadow-mapSize-width={512}
          shadow-mapSize-height={512}
        />
        <pointLight position={[-2, 2, 2]} intensity={0.3} />
        
        {/* Sac 3D en rotation */}
        <RotatingBag3D />
      </Canvas>
    </BagContainer>
  );
};

export default SimpleBag3D;
