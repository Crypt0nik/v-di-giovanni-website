import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Version simplifiée pour diagnostiquer le problème de chargement
interface BagConfiguration {
  bodyColor: string;
  bodyMaterial: string;
  handleColor: string;
  handleType: string;
  flapColor: string;
  flapMaterial: string;
}

interface SimpleBagViewerProps {
  configuration: BagConfiguration;
  className?: string;
}

// Filtres de couleur - identiques au composant principal
const colorFilters = {
  '#D4A574': 'sepia(0.8) saturate(1.2) hue-rotate(25deg) brightness(1.1) contrast(1.05)', // Beige Nude
  '#F4E6E1': 'sepia(0.3) saturate(0.5) hue-rotate(15deg) brightness(1.05) contrast(0.95)', // Rose Poudré
  '#8B4513': 'sepia(1) saturate(2.8) hue-rotate(15deg) brightness(0.7) contrast(1.3)', // Marron Cognac
  '#2C2C2C': 'grayscale(1) brightness(0.35) contrast(1.8)', // Gris Foncé
  '#8B1538': 'sepia(1) saturate(2.5) hue-rotate(330deg) brightness(0.65) contrast(1.4)', // Bordeaux
  '#1E3A8A': 'sepia(1) saturate(2) hue-rotate(200deg) brightness(0.55) contrast(1.6)' // Bleu Marine
};

const ViewerContainer = styled(motion.div)`
  width: 100%;
  height: 400px;
  border-radius: 20px;
  overflow: hidden;
  background: white;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    height: 350px;
  }
`;

const BagImageContainer = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  transform: scale(1.1);
  transition: transform 0.3s ease;
  animation: gentleFloat 4s ease-in-out infinite;

  &:hover {
    transform: scale(1.15);
    animation-play-state: paused;
  }

  @keyframes gentleFloat {
    0%, 100% { transform: scale(1.1) translateY(0px); }
    50% { transform: scale(1.1) translateY(-5px); }
  }

  @media (max-width: 768px) {
    width: 250px;
    height: 250px;
  }
`;

const BagPartImage = styled.img<{ $filter?: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: ${props => props.$filter || 'none'};
  transition: filter 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: filter;
`;

const ConfiguratorBadge = styled.div`
  position: absolute;
  bottom: 15px;
  left: 15px;
  background: rgba(139, 69, 19, 0.9);
  color: white;
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  z-index: 10;
  
  &::before {
    content: "🎨";
    margin-right: 6px;
  }
`;

const ColorIndicator = styled.div<{ $color: string }>`
  position: absolute;
  top: 15px;
  left: 15px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.$color};
  border: 3px solid white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  
  &::after {
    content: "🎨";
    filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.5));
  }
`;

// Fonction pour obtenir le filtre correct pour une couleur
const getColorFilter = (color: string): string => {
  return colorFilters[color as keyof typeof colorFilters] || 'none';
};

// Composant simplifié sans gestion de chargement complexe
const SimpleBagViewer: React.FC<SimpleBagViewerProps> = ({ configuration, className }) => {
  console.log('🚀 SimpleBagViewer rendu avec configuration:', configuration);

  // Déterminer les filtres pour chaque partie
  const bodyFilter = getColorFilter(configuration.bodyColor);
  const flapFilter = getColorFilter(configuration.flapColor); 
  const handleFilter = getColorFilter(configuration.handleColor);

  console.log('🎨 Filtres appliqués:', {
    body: `${configuration.bodyColor} → ${bodyFilter}`,
    flap: `${configuration.flapColor} → ${flapFilter}`,
    handle: `${configuration.handleColor} → ${handleFilter}`
  });

  return (
    <ViewerContainer
      className={className}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ColorIndicator $color={configuration.bodyColor} />
      
      <ConfiguratorBadge>
        Images PNG (Simple)
      </ConfiguratorBadge>

      <BagImageContainer>
        {/* Corps du sac */}
        <BagPartImage
          src="/images/bag-parts/bag-body.png"
          alt="Corps du sac"
          $filter={bodyFilter}
          onLoad={() => console.log('✅ Image corps chargée')}
          onError={(e) => console.error('❌ Erreur corps:', e)}
        />

        {/* Rabat du sac */}
        <BagPartImage
          src="/images/bag-parts/bag-flap.png"
          alt="Rabat du sac"
          $filter={flapFilter}
          onLoad={() => console.log('✅ Image rabat chargée')}
          onError={(e) => console.error('❌ Erreur rabat:', e)}
        />

        {/* Poignée du sac */}
        <BagPartImage
          src="/images/bag-parts/bag-handle.png"
          alt="Poignée du sac"
          $filter={handleFilter}
          onLoad={() => console.log('✅ Image poignée chargée')}
          onError={(e) => console.error('❌ Erreur poignée:', e)}
        />
      </BagImageContainer>
    </ViewerContainer>
  );
};

export default SimpleBagViewer;
