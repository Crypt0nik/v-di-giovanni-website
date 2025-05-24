import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import { Group } from 'three';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Container pour le modèle 3D
const BagContainer = styled(motion.div)`
  width: 400px;
  height: 500px;
  margin: 0 auto;
  border-radius: 20px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  filter: drop-shadow(0 20px 40px rgba(0,0,0,0.1));

  @media (max-width: 768px) {
    width: 350px;
    height: 450px;
  }

  @media (max-width: 480px) {
    width: 280px;
    height: 360px;
  }
`;

// Composant pour afficher le modèle GLB
const GLBBagModel: React.FC = () => {
  const bagRef = useRef<Group>(null);
  const { scene } = useGLTF('/models/bag-model.glb');
  
  useFrame(() => {
    if (bagRef.current) {
      bagRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={bagRef} position={[0, 0, 0]} scale={[2, 2, 2]}>
      <primitive object={scene} />
    </group>
  );
};

// Composant de fallback pour le chargement
const FallbackBag: React.FC = () => {
  const bagRef = useRef<Group>(null);
  
  useFrame(() => {
    if (bagRef.current) {
      bagRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={bagRef} position={[0, 0, 0]} scale={[1.5, 1.5, 1.5]}>
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
      
      {/* Fermoir */}
      <mesh position={[0, 0.3, 0.75]} castShadow>
        <cylinderGeometry args={[0.06, 0.06, 0.08, 8]} />
        <meshStandardMaterial color="#C0A062" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
};

const HeroBag3DNew: React.FC = () => {
  // Précharger le modèle GLB
  useEffect(() => {
    useGLTF.preload('/models/bag-model.glb');
  }, []);

  return (
    <BagContainer
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <Canvas
        camera={{ 
          position: [4, 0, 4],
          fov: 50
        }}
        style={{ background: 'transparent' }}
        onError={(error) => {
          console.warn('Erreur Canvas:', error);
        }}
      >
        {/* Éclairage optimisé */}
        <ambientLight intensity={0.8} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={0.6}
        />
        <directionalLight 
          position={[-5, 3, -5]} 
          intensity={0.4}
        />

        {/* Modèle avec fallback */}
        <Suspense fallback={<FallbackBag />}>
          <GLBBagModel />
        </Suspense>

        {/* Environnement simple */}
        <Environment preset="studio" />
      </Canvas>
    </BagContainer>
  );
};

export default HeroBag3DNew;
