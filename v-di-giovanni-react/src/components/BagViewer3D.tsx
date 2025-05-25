import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Interface pour la configuration du sac (compatible avec Configurator)
interface BagConfiguration {
  bodyColor: string;
  bodyMaterial: string;
  handleColor: string;
  handleType: string;
  flapColor: string;
  flapMaterial: string;
}

interface BagViewer3DProps {
  configuration: BagConfiguration;
  className?: string;
}

// Fonction pour obtenir le chemin de l'image selon la couleur pour le body et handle
const getMainColorImagePath = (targetColor: string, part: 'body' | 'handle'): string => {
  const upperColor = targetColor.toUpperCase();
  
  // Mapping des couleurs principales vers les dossiers correspondants
  const colorFolderMap: { [key: string]: string } = {
    '#000000': 'noir',           // Noir
    '#8B4513': 'marron-cognac',  // Marron Cognac
    '#FFFFFF': 'blanc'           // Blanc
  };
  
  const colorFolder = colorFolderMap[upperColor];
  
  if (colorFolder) {
    return `/images/bag-parts/main-colors/${colorFolder}/${part}.png`;
  }
  
  // Fallback vers l'ancienne méthode si la couleur n'est pas dans les 3 principales
  return `/images/bag-parts/bag-${part}.png`;
};

// Fonction pour obtenir le chemin de l'image du rabat depuis le dossier colors
const getFlapColorImagePath = (targetColor: string): string => {
  const upperColor = targetColor.toUpperCase();
  
  // Mapping des couleurs du rabat vers les dossiers correspondants
  const flapColorFolderMap: { [key: string]: string } = {
    '#8B4513': 'marron-cognac',  // Marron Cognac
    '#2C2C2C': 'gris-fonce',     // Gris Foncé (ex-Noir Élégant)
    '#D4A574': 'beige-nude',     // Beige Nude
    '#F4E6E1': 'rose-poudre',    // Rose Poudré
    '#8B1538': 'bordeaux',       // Bordeaux
    '#81D4E6': 'bleu-tiffany'    // Bleu Tiffany (ex-Bleu Marine)
  };
  
  const colorFolder = flapColorFolderMap[upperColor];
  
  if (colorFolder) {
    return `/images/bag-parts/colors/${colorFolder}/flap.png`;
  }
  
  // Fallback vers l'ancienne méthode si la couleur n'est pas dans les couleurs du rabat
  return `/images/bag-parts/bag-flap.png`;
};

// Fonction pour déterminer la meilleure méthode de coloration pour chaque couleur
const getColoringMethod = (targetColor: string, part: 'body' | 'handle' | 'flap' = 'flap'): { type: 'filter', value: string } => {
  const upperColor = targetColor.toUpperCase();
  
  // Pour les couleurs principales du body et handle, pas de filtre nécessaire car les images PNG sont déjà colorées
  const mainColors = ['#000000', '#8B4513', '#FFFFFF'];
  if ((part === 'body' || part === 'handle') && mainColors.includes(upperColor)) {
    return { type: 'filter', value: 'none' };
  }
  
  // Pour les couleurs du rabat, pas de filtre nécessaire car les images PNG sont déjà colorées
  const flapColors = ['#8B4513', '#2C2C2C', '#D4A574', '#F4E6E1', '#8B1538', '#81D4E6'];
  if (part === 'flap' && flapColors.includes(upperColor)) {
    return { type: 'filter', value: 'none' };
  }
  
  // Mapping spécialisé pour les 6 couleurs du configurateur - TOUS EN FILTRES CSS
  const colorMethods: { [key: string]: any } = {
    // Beige Nude - Filtre CSS optimisé pour éviter le problème d'arrière-plan
    '#D4A574': { 
      type: 'filter', 
      value: 'sepia(0.8) saturate(1.2) hue-rotate(25deg) brightness(1.1) contrast(1.05)'
    },
    
    // Rose Poudré - Filtre CSS doux
    '#F4E6E1': { 
      type: 'filter', 
      value: 'sepia(0.3) saturate(0.5) hue-rotate(15deg) brightness(1.05) contrast(0.95)'
    },
    
    // Bordeaux - filtre CSS optimisé
    '#8B1538': { 
      type: 'filter', 
      value: 'sepia(1) saturate(2.5) hue-rotate(330deg) brightness(0.65) contrast(1.4)'
    },
    
    // Bleu Marine - filtre CSS optimisé  
    '#1E3A8A': { 
      type: 'filter', 
      value: 'sepia(1) saturate(2) hue-rotate(200deg) brightness(0.55) contrast(1.6)'
    },
    
    // Marron Cognac - Filtre CSS riche et profond
    '#8B4513': { 
      type: 'filter', 
      value: 'sepia(1) saturate(2.8) hue-rotate(15deg) brightness(0.7) contrast(1.3)'
    },
    
    // Gris Foncé - Filtre CSS élégant
    '#2C2C2C': { 
      type: 'filter', 
      value: 'grayscale(1) brightness(0.35) contrast(1.8)'
    }
  };
  
  if (colorMethods[upperColor]) {
    return colorMethods[upperColor];
  }
  
  // Pour les autres couleurs, utiliser le système de filtres avancé
  return { type: 'filter', value: getAdvancedColorFilter(targetColor) };
};

// Fonction optimisée pour convertir une couleur hex en filtre CSS pour images BLANCHES de base
const getAdvancedColorFilter = (targetColor: string): string => {
  // Pour les images blanches, les filtres CSS ont des limites
  // On utilise un système hybride: filtre + overlay color si nécessaire
  const whiteBaseColorMap: { [key: string]: string } = {
    // NOUVELLE APPROCHE: Filtres plus simples et précis
    '#8B4513': 'sepia(1) saturate(1.5) hue-rotate(10deg) brightness(0.8)',     // Marron Cognac
    '#2C2C2C': 'grayscale(1) brightness(0.2) contrast(2.5)',                   // Noir Élégant  
    '#D4A574': 'sepia(0.4) saturate(0.8) brightness(1.05)',                    // Beige Nude - SIMPLIFIÉ
    '#F4E6E1': 'sepia(0.15) saturate(0.4) brightness(1.02)',                   // Rose Poudré - SIMPLIFIÉ
    '#8B1538': 'sepia(1) saturate(2) hue-rotate(330deg) brightness(0.7)',      // Bordeaux - SIMPLIFIÉ  
    '#1E3A8A': 'sepia(1) saturate(1.8) hue-rotate(200deg) brightness(0.6)',    // Bleu Marine - SIMPLIFIÉ
    
    // Couleurs de poignées communes
    '#654321': 'sepia(1) saturate(2.8) hue-rotate(15deg) brightness(0.55) contrast(1.5)',
    '#A0522D': 'sepia(1) saturate(2.2) hue-rotate(25deg) brightness(0.7) contrast(1.3)',
    
    // Couleurs de base optimisées pour blanc
    '#000000': 'grayscale(1) brightness(0.15) contrast(2.5)',
    '#FFFFFF': 'none', // Pas de filtre pour le blanc sur blanc
    '#808080': 'grayscale(1) brightness(0.5) contrast(1.3)',
    
    // Couleurs vives pour tests - OPTIMISÉES POUR BASE BLANCHE
    '#FF0000': 'sepia(1) saturate(5) hue-rotate(0deg) brightness(0.6) contrast(1.5)',
    '#00FF00': 'sepia(1) saturate(4) hue-rotate(90deg) brightness(0.7) contrast(1.4)',
    '#0000FF': 'sepia(1) saturate(5) hue-rotate(200deg) brightness(0.5) contrast(1.7)',
    '#FFFF00': 'sepia(1) saturate(3) hue-rotate(50deg) brightness(0.8) contrast(1.2)',
    '#FFA500': 'sepia(1) saturate(3.5) hue-rotate(30deg) brightness(0.75) contrast(1.3)',
    '#800080': 'sepia(1) saturate(3) hue-rotate(270deg) brightness(0.45) contrast(1.6)',
  };

  // Si couleur prémappée, utiliser le filtre optimisé pour base blanche
  const upperColor = targetColor.toUpperCase();
  if (whiteBaseColorMap[upperColor]) {
    return whiteBaseColorMap[upperColor];
  }

  // Sinon, calculer un filtre avancé basé sur la couleur
  const hex = targetColor.replace('#', '');
  if (hex.length !== 6) {
    return 'none';
  }

  const r = parseInt(hex.substr(0, 2), 16) / 255;
  const g = parseInt(hex.substr(2, 2), 16) / 255;
  const b = parseInt(hex.substr(4, 2), 16) / 255;

  // Calculer HSL
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  // Convertir en degrés
  const hue = Math.round(h * 360);
  const saturation = Math.round(s * 100);
  const lightness = Math.round(l * 100);

  // Algorithme optimisé pour images à BASE BLANCHE
  if (saturation < 10) {
    // Couleur grise/neutre - plus de contraste pour base blanche
    return `grayscale(1) brightness(${lightness / 100}) contrast(${2 - lightness / 100})`;
  } else if (lightness > 80) {
    // Couleur claire - réduire la luminosité pour la rendre visible sur blanc
    return `sepia(0.5) saturate(${saturation / 30}) hue-rotate(${hue}deg) brightness(${0.7 + lightness / 300}) contrast(1.1)`;
  } else if (lightness < 30) {
    // Couleur foncée - augmenter saturation et contraste pour base blanche
    return `sepia(1) saturate(${3 + saturation / 25}) hue-rotate(${hue}deg) brightness(${0.3 + lightness / 200}) contrast(${1.5 + saturation / 100})`;
  } else {
    // Couleur normale - optimisée pour base blanche
    return `sepia(1) saturate(${2.5 + saturation / 40}) hue-rotate(${hue}deg) brightness(${0.5 + lightness / 200}) contrast(${1.3 + saturation / 150})`;
  }
};

// Styles pour le container principal
const ViewerContainer = styled(motion.div)`
  width: 100%;
  height: 400px;
  border-radius: 20px;
  overflow: hidden;
  background: white; /* Force l'arrière-plan blanc pour éviter les problèmes d'overlay */
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
  transition: filter 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
  will-change: filter;
`;

const BagPartContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

const LoadingFallback = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-family: 'Inter', sans-serif;
  color: var(--primary-color);
  font-weight: 500;
  text-align: center;
  
  .loading-text {
    font-size: 16px;
    margin-bottom: 10px;
  }
  
  .loading-debug {
    font-size: 12px;
    opacity: 0.7;
    font-family: monospace;
    background: rgba(0,0,0,0.1);
    padding: 10px;
    border-radius: 8px;
    margin-top: 10px;
  }
`;

const ErrorMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-family: 'Inter', sans-serif;
  color: var(--primary-color);
  text-align: center;
  padding: 20px;
  
  h3 {
    margin: 0 0 10px 0;
    font-size: 18px;
    font-weight: 600;
  }
  
  p {
    margin: 0;
    font-size: 14px;
    opacity: 0.7;
    line-height: 1.4;
  }
`;

const LoadingProgress = styled.div<{ $progress: number }>`
  position: absolute;
  bottom: 0;
  left: 0;
  width: ${props => props.$progress}%;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-color), #D4AF37);
  transition: width 0.3s ease;
  border-radius: 0 0 20px 0;
`;

// Composant principal BagViewer3D basé sur des images PNG
const BagViewer3D: React.FC<BagViewer3DProps> = ({ configuration, className }) => {
  const [imagesLoaded, setImagesLoaded] = useState<{[key: string]: boolean}>({
    body: false,
    flap: false,
    handle: false
  });
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showImages, setShowImages] = useState(false);

  // Timeout pour forcer l'affichage après 1 seconde même si onLoad ne se déclenche pas
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('🕐 Timeout de chargement - Affichage forcé des images');
      setShowImages(true);
      setImagesLoaded({ body: true, flap: true, handle: true });
      setLoadingProgress(100);
    }, 1000); // Réduit à 1 seconde pour un feedback plus rapide

    return () => clearTimeout(timer);
  }, []);

  const handleImageLoad = (part: string) => {
    console.log(`✅ Image chargée avec succès: ${part}`);
    setImagesLoaded(prev => {
      const newState = { ...prev, [part]: true };
      const loadedCount = Object.values(newState).filter(Boolean).length;
      setLoadingProgress((loadedCount / 3) * 100);
      console.log(`📊 Progression: ${loadedCount}/3 images chargées (${Math.round((loadedCount / 3) * 100)}%)`);
      
      // Si toutes les images sont chargées, afficher immédiatement
      if (loadedCount === 3) {
        setShowImages(true);
      }
      
      return newState;
    });
  };

  const handleImageError = (event: any) => {
    console.error('❌ Erreur de chargement d\'image:', event?.target?.src || 'src inconnue');
    console.error('Type d\'erreur:', event?.type);
    console.error('Détails de l\'erreur:', event);
    // Forcer l'affichage même en cas d'erreur pour débugger
    setShowImages(true);
  };

  // Fonction pour vérifier si une image est déjà chargée (cache)
  const checkImageLoaded = (src: string, part: string) => {
    const img = new Image();
    img.onload = () => {
      console.log(`🔄 Image ${part} déjà en cache - marquée comme chargée`);
      handleImageLoad(part);
    };
    img.onerror = () => {
      console.log(`❌ Image ${part} non accessible`);
    };
    img.src = src;
  };

  // Vérifier le cache au montage du composant
  useEffect(() => {
    console.log('🔍 Vérification du cache des images...');
    checkImageLoaded('/images/bag-parts/bag-body.png', 'body');
    checkImageLoaded('/images/bag-parts/bag-flap.png', 'flap');
    checkImageLoaded('/images/bag-parts/bag-handle.png', 'handle');
  }, []);

  const allImagesLoaded = Object.values(imagesLoaded).every(loaded => loaded) || showImages;

  // Logger l'état de chargement
  useEffect(() => {
    console.log('🔄 État de chargement mis à jour:', { 
      allImagesLoaded, 
      showImages, 
      imagesLoaded,
      loadingProgress 
    });
  }, [allImagesLoaded, showImages, imagesLoaded, loadingProgress]);

  // Afficher un message d'erreur si les images ne se chargent pas
  if (false) { // Temporairement désactivé pour debugger
    return (
      <ViewerContainer
        className={className}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ErrorMessage>
          <h3>🎨 Configurateur en mode démo</h3>
          <p>
            Nous préparons vos images de sac personnalisées.<br/>
            Les couleurs seront bientôt appliquées dynamiquement !
          </p>
          <div style={{ fontSize: '12px', marginTop: '10px', opacity: 0.6 }}>
            Debug: body={imagesLoaded.body ? '✅' : '❌'}, 
            flap={imagesLoaded.flap ? '✅' : '❌'}, 
            handle={imagesLoaded.handle ? '✅' : '❌'}
          </div>
        </ErrorMessage>
      </ViewerContainer>
    );
  }

  return (
    <ViewerContainer
      className={className}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >


      {!allImagesLoaded && (
        <>
          <LoadingFallback>
            <div className="loading-text">
              Chargement de votre sac personnalisé...
            </div>
            <div className="loading-debug">
              Debug: body={imagesLoaded.body ? '✅' : '❌'} | 
              flap={imagesLoaded.flap ? '✅' : '❌'} | 
              handle={imagesLoaded.handle ? '✅' : '❌'}<br/>
              showImages: {showImages ? '✅' : '❌'} | 
              allLoaded: {allImagesLoaded ? '✅' : '❌'}<br/>
              Progress: {loadingProgress.toFixed(0)}%
            </div>
          </LoadingFallback>
          <LoadingProgress $progress={loadingProgress} />
        </>
      )}

      <BagImageContainer style={{ 
        opacity: allImagesLoaded ? 1 : 0,
        transition: 'opacity 0.5s ease'
      }}>
        {/* Corps du sac - votre image personnalisée */}
        {(() => {
          const bodyMethod = getColoringMethod(configuration.bodyColor, 'body');
          const bodyImagePath = getMainColorImagePath(configuration.bodyColor, 'body');
          return (
            <BagPartContainer>
              <BagPartImage
                src={bodyImagePath}
                alt="Corps du sac"
                $filter={bodyMethod.value}
                onLoad={() => handleImageLoad('body')}
                onError={handleImageError}
              />
            </BagPartContainer>
          );
        })()}

        {/* Rabat du sac - images PNG depuis le dossier colors */}
        {(() => {
          const flapMethod = getColoringMethod(configuration.flapColor, 'flap');
          const flapImagePath = getFlapColorImagePath(configuration.flapColor);
          return (
            <BagPartContainer>
              <BagPartImage
                src={flapImagePath}
                alt="Rabat du sac"
                $filter={flapMethod.value}
                onLoad={() => handleImageLoad('flap')}
                onError={handleImageError}

                style={{
                  transform: 'translate(0px, 0px)', // X horizontal, Y vertical
                  marginLeft: '2px',
                  marginTop: '6.6px'
                  , width: '99%', height: '98%'
                }}
              />
            </BagPartContainer>
          );
        })()}

        {/* Poignée du sac - votre image personnalisée */}
        {(() => {
          const handleMethod = getColoringMethod(configuration.handleColor, 'handle');
          const handleImagePath = getMainColorImagePath(configuration.handleColor, 'handle');
          return (
            <BagPartContainer>
              <BagPartImage
                src={handleImagePath}
                alt="Poignée du sac"
                $filter={handleMethod.value}
                onLoad={() => handleImageLoad('handle')}
                onError={handleImageError}

                style={{
                  transform: 'translate(0px, 0px)', // X horizontal, Y vertical
                  marginLeft: '-1px',
                  marginTop: '7px'
                }}
              />
            </BagPartContainer>
          );
        })()}
      </BagImageContainer>

      {/* Barre de progression de chargement */}
      {!allImagesLoaded && (
        <LoadingProgress $progress={Object.values(imagesLoaded).filter(loaded => loaded).length * 33.33} />
      )}
    </ViewerContainer>
  );
};

export default BagViewer3D;