import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Grip, Palette } from 'lucide-react';
import { Container, SectionTitle, SectionSubtitle } from '../styles/GlobalStyles';
import BagViewer3D from './BagViewer3D';

const ConfiguratorSection = styled.section`
  background: var(--secondary-color);
  padding: 5rem 0;

  @media (max-width: 768px) {
    padding: 3rem 0;
  }
`;

const ConfiguratorInterface = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-top: 3rem;

  @media (max-width: 1024px) {
    gap: 3rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const BagPreview = styled.div`
  background: var(--white);
  border-radius: 20px;
  padding: 3rem;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const PriceContainer = styled.div`
  background: var(--white);
  border-radius: 15px;
  padding: 2rem;
  margin: 2rem 0;
  text-align: center;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  border: 2px solid var(--primary-color);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(212, 165, 116, 0.1), transparent);
    animation: shimmer 3s infinite;
  }

  @keyframes shimmer {
    0% { left: -100%; }
    100% { left: 100%; }
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    margin: 1.5rem 0;
  }
`;

const PriceDisplay = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const PriceLabel = styled.p`
  color: var(--text-light);
  margin: 0;
  font-size: 0.9rem;
  font-weight: 500;
  position: relative;
  z-index: 1;
`;

const PriceBreakdown = styled.div`
  background: rgba(212, 165, 116, 0.08);
  border-radius: 10px;
  padding: 1rem;
  margin-top: 1rem;
  border: 1px solid rgba(212, 165, 116, 0.2);
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 0.8rem;
  }
`;

const BreakdownItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  color: var(--text-dark);
  font-size: 0.85rem;

  &:last-child {
    margin-bottom: 0;
    font-weight: 600;
    border-top: 1px solid rgba(212, 165, 116, 0.3);
    padding-top: 0.5rem;
    margin-top: 0.5rem;
  }

  .price-change {
    color: #16a34a;
    font-weight: 600;
    
    &.negative {
      color: #dc2626;
    }
  }
`;

const ConfiguratorTabs = styled.div`
  display: flex;
  background: var(--white);
  border-radius: 15px;
  margin-bottom: 2rem;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0,0,0,0.05);
`;

const TabButton = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 1.5rem;
  background: ${props => props.active ? 'var(--primary-color)' : 'transparent'};
  border: none;
  cursor: pointer;
  font-weight: 600;
  color: ${props => props.active ? 'var(--white)' : 'var(--text-light)'};
  transition: all 0.3s ease;
  text-align: center;
  position: relative;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  min-height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;

  svg {
    font-size: 1.2rem;
    width: 20px;
    height: 20px;
  }

  &:hover:not(.active) {
    background: var(--pink-accent);
    color: var(--text-dark);
  }

  @media (max-width: 640px) {
    padding: 1rem;
    min-height: 50px;
    font-size: 0.8rem;
    
    svg {
      width: 16px;
      height: 16px;
    }
  }

  @media (max-width: 480px) {
    padding: 0.8rem 0.5rem;
    font-size: 0.7rem;
    
    svg {
      width: 14px;
      height: 14px;
    }
  }
`;

const TabContent = styled(motion.div)`
  animation: fadeInUp 0.3s ease;
`;

const OptionGroup = styled.div`
  background: var(--white);
  border-radius: 15px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 5px 20px rgba(0,0,0,0.05);

  @media (max-width: 768px) {
    padding: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;

const OptionGroupTitle = styled.h4`
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: var(--text-dark);

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const ColorOptions = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 640px) {
    gap: 0.8rem;
  }

  @media (max-width: 480px) {
    gap: 0.6rem;
    justify-content: center;
  }
`;

const ColorSwatch = styled.button<{ color: string; active: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  border: 3px solid ${props => {
    if (props.active) return 'var(--primary-color)';
    if (props.color.toLowerCase() === '#ffffff' || props.color.toLowerCase() === 'white') return '#e2e8f0';
    return 'transparent';
  }};
  background: ${props => props.color};
  transition: all 0.3s ease;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  position: relative;
  box-shadow: ${props => 
    (props.color.toLowerCase() === '#ffffff' || props.color.toLowerCase() === 'white') 
      ? '0 2px 8px rgba(0,0,0,0.1)' 
      : 'none'
  };

  &:hover {
    border-color: var(--primary-color);
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }

  ${props => props.active && `
    &::after {
      content: "✓";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: ${props.color.toLowerCase() === '#ffffff' || props.color.toLowerCase() === 'white' 
        ? '#2563eb' 
        : 'white'
      };
      font-weight: bold;
      font-size: 0.8rem;
      text-shadow: ${props.color.toLowerCase() === '#ffffff' || props.color.toLowerCase() === 'white' 
        ? 'none' 
        : '0 0 3px rgba(0,0,0,0.8)'
      };
    }
  `}

  @media (max-width: 640px) {
    width: 35px;
    height: 35px;
  }

  @media (max-width: 480px) {
    width: 32px;
    height: 32px;
  }
`;

const MaterialOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;

  @media (max-width: 640px) {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 0.8rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr 1fr;
    gap: 0.6rem;
  }
`;

const OptionButton = styled.button<{ active: boolean }>`
  padding: 1.5rem;
  border: 2px solid ${props => props.active ? 'var(--primary-color)' : '#e5e5e5'};
  border-radius: 10px;
  background: ${props => props.active ? 'var(--pink-accent)' : 'var(--white)'};
  cursor: pointer;
  text-align: center;
  transition: all 0.3s ease;
  font-weight: 500;
  min-height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;

  &:hover {
    border-color: var(--primary-color);
    background: var(--pink-accent);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(212, 165, 116, 0.2);
  }

  small {
    color: ${props => props.active ? 'var(--accent-color)' : 'var(--text-light)'};
    font-size: 0.85rem;
    margin-top: 0.25rem;
  }

  @media (max-width: 768px) {
    padding: 1rem;
    min-height: 70px;
    font-size: 0.9rem;
  }

  @media (max-width: 640px) {
    padding: 0.8rem;
    min-height: 60px;
    font-size: 0.8rem;
  }

  @media (max-width: 480px) {
    padding: 0.6rem;
    min-height: 50px;
    font-size: 0.75rem;
  }
`;

interface ConfigurationState {
  bodyColor: string;
  bodyMaterial: string;
  handleColor: string;
  handleType: string;
  flapColor: string;
  flapMaterial: string;
}

const Configurator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'body' | 'handle' | 'flap'>('body');
  const [config, setConfig] = useState<ConfigurationState>({
    bodyColor: '#8B4513', // Marron Cognac - couleur valide pour le sac principal
    bodyMaterial: 'cuir',
    handleColor: '#8B4513', // Marron Cognac - couleur valide pour l'anse
    handleType: 'cuir',
    flapColor: '#8B4513', // Marron Cognac - couleur valide pour le rabat
    flapMaterial: 'cuir'
  });

  // Couleurs pour le sac principal et l'anse (3 couleurs seulement)
  const mainColors = [
    { name: 'Noir', value: '#000000', price: 0 },
    { name: 'Marron Cognac', value: '#8B4513', price: 0 },
    { name: 'Blanc', value: '#FFFFFF', price: 0 }
  ];

  // Couleurs pour le rabat (couleurs avec images PNG dédiées)
  const flapColors = [
    { name: 'Marron Cognac', value: '#8B4513', price: 0 },
    { name: 'Gris Foncé', value: '#2C2C2C', price: 0 },
    { name: 'Beige Nude', value: '#D4A574', price: 0 },
    { name: 'Rose Poudré', value: '#F4E6E1', price: 25 },
    { name: 'Bordeaux', value: '#8B1538', price: 25 },
    { name: 'Bleu Tiffany', value: '#81D4E6', price: 25 }
  ];

  const materials = [
    { name: 'Cuir Italien', value: 'cuir', price: 0 },
    { name: 'Cuir Vegan', value: 'vegan', price: 30 },
    { name: 'Toile Canvas', value: 'canvas', price: -20 },
    { name: 'Cuir Nappa', value: 'nappa', price: 50 }
  ];

  const handleTypes = [
    { name: 'Anses Cuir', value: 'cuir', price: 0 },
    { name: 'Chaîne Dorée', value: 'chaine', price: 40 },
    { name: 'Bandoulière', value: 'bandouliere', price: 20 },
    { name: 'Double Anse', value: 'double', price: 30 }
  ];

  const calculatePrice = () => {
    const basePrice = 299;
    const bodyColorPrice = mainColors.find(c => c.value === config.bodyColor)?.price || 0;
    const bodyMaterialPrice = materials.find(m => m.value === config.bodyMaterial)?.price || 0;
    const handlePrice = handleTypes.find(h => h.value === config.handleType)?.price || 0;
    const flapColorPrice = flapColors.find(c => c.value === config.flapColor)?.price || 0;
    const flapMaterialPrice = materials.find(m => m.value === config.flapMaterial)?.price || 0;
    
    return basePrice + bodyColorPrice + bodyMaterialPrice + handlePrice + flapColorPrice + flapMaterialPrice;
  };

  const getPriceBreakdown = () => {
    const basePrice = 299;
    const breakdown = [
      { label: 'Sac de base', price: basePrice, isBase: true }
    ];

    const bodyColorPrice = mainColors.find(c => c.value === config.bodyColor)?.price || 0;
    if (bodyColorPrice !== 0) {
      const colorName = mainColors.find(c => c.value === config.bodyColor)?.name || 'Couleur';
      breakdown.push({ label: `${colorName}`, price: bodyColorPrice, isBase: false });
    }

    const bodyMaterialPrice = materials.find(m => m.value === config.bodyMaterial)?.price || 0;
    if (bodyMaterialPrice !== 0) {
      const materialName = materials.find(m => m.value === config.bodyMaterial)?.name || 'Matériau';
      breakdown.push({ label: `${materialName}`, price: bodyMaterialPrice, isBase: false });
    }

    const handlePrice = handleTypes.find(h => h.value === config.handleType)?.price || 0;
    if (handlePrice !== 0) {
      const handleName = handleTypes.find(h => h.value === config.handleType)?.name || 'Anse';
      breakdown.push({ label: `${handleName}`, price: handlePrice, isBase: false });
    }

    const flapColorPrice = flapColors.find(c => c.value === config.flapColor)?.price || 0;
    if (flapColorPrice !== 0) {
      const colorName = flapColors.find(c => c.value === config.flapColor)?.name || 'Couleur rabat';
      breakdown.push({ label: `${colorName}`, price: flapColorPrice, isBase: false });
    }

    const flapMaterialPrice = materials.find(m => m.value === config.flapMaterial)?.price || 0;
    if (flapMaterialPrice !== 0) {
      const materialName = materials.find(m => m.value === config.flapMaterial)?.name || 'Matériau rabat';
      breakdown.push({ label: `${materialName}`, price: flapMaterialPrice, isBase: false });
    }

    return breakdown;
  };

  const updateConfig = (key: keyof ConfigurationState, value: string) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const tabs = [
    { id: 'body' as const, label: 'Sac Principal', icon: <ShoppingBag /> },
    { id: 'handle' as const, label: 'Anse', icon: <Grip /> },
    { id: 'flap' as const, label: 'Rabat', icon: <Palette /> }
  ];

  return (
    <ConfiguratorSection id="configurator">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <SectionTitle>Personnalisez le Vôtre</SectionTitle>
          <SectionSubtitle>
            Créez votre sac unique en choisissant les couleurs, matériaux et finitions 
            qui correspondent à votre style personnel.
          </SectionSubtitle>
        </motion.div>

        <ConfiguratorInterface>
          <BagPreview>
            <BagViewer3D
              configuration={config}
            />
            <PriceContainer>
              <PriceDisplay>{calculatePrice()}€</PriceDisplay>
              <PriceLabel>Prix personnalisé selon vos choix</PriceLabel>
              <PriceBreakdown>
                {getPriceBreakdown().map((item, index) => (
                  <BreakdownItem key={index}>
                    <span>{item.label}</span>
                    <span className={item.price > 0 ? 'price-change' : item.price < 0 ? 'price-change negative' : ''}>
                      {item.isBase ? `${item.price}€` : 
                       item.price > 0 ? `+${item.price}€` : 
                       item.price < 0 ? `${item.price}€` : 'Inclus'}
                    </span>
                  </BreakdownItem>
                ))}
              </PriceBreakdown>
            </PriceContainer>
          </BagPreview>

          <div>
            <ConfiguratorTabs>
              {tabs.map(tab => (
                <TabButton
                  key={tab.id}
                  active={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </TabButton>
              ))}
            </ConfiguratorTabs>

            <AnimatePresence mode="wait">
              {activeTab === 'body' && (
                <TabContent
                  key="body"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <OptionGroup>
                    <OptionGroupTitle>Couleur du Sac</OptionGroupTitle>
                    <ColorOptions>
                      {mainColors.map(color => (
                        <ColorSwatch
                          key={color.value}
                          color={color.value}
                          active={config.bodyColor === color.value}
                          onClick={() => updateConfig('bodyColor', color.value)}
                          title={`${color.name} ${color.price > 0 ? `(+${color.price}€)` : ''}`}
                        />
                      ))}
                    </ColorOptions>
                  </OptionGroup>

                  <OptionGroup>
                    <OptionGroupTitle>Matériau</OptionGroupTitle>
                    <MaterialOptions>
                      {materials.map(material => (
                        <OptionButton
                          key={material.value}
                          active={config.bodyMaterial === material.value}
                          onClick={() => updateConfig('bodyMaterial', material.value)}
                        >
                          <div>{material.name}</div>
                          <small>
                            {material.price > 0 ? `+${material.price}€` : 
                             material.price < 0 ? `${material.price}€` : 'Inclus'}
                          </small>
                        </OptionButton>
                      ))}
                    </MaterialOptions>
                  </OptionGroup>
                </TabContent>
              )}

              {activeTab === 'handle' && (
                <TabContent
                  key="handle"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <OptionGroup>
                    <OptionGroupTitle>Couleur des Anses</OptionGroupTitle>
                    <ColorOptions>
                      {mainColors.map(color => (
                        <ColorSwatch
                          key={color.value}
                          color={color.value}
                          active={config.handleColor === color.value}
                          onClick={() => updateConfig('handleColor', color.value)}
                          title={color.name}
                        />
                      ))}
                    </ColorOptions>
                  </OptionGroup>

                  <OptionGroup>
                    <OptionGroupTitle>Type d'Anse</OptionGroupTitle>
                    <MaterialOptions>
                      {handleTypes.map(handle => (
                        <OptionButton
                          key={handle.value}
                          active={config.handleType === handle.value}
                          onClick={() => updateConfig('handleType', handle.value)}
                        >
                          <div>{handle.name}</div>
                          <small>{handle.price > 0 ? `+${handle.price}€` : 'Inclus'}</small>
                        </OptionButton>
                      ))}
                    </MaterialOptions>
                  </OptionGroup>
                </TabContent>
              )}

              {activeTab === 'flap' && (
                <TabContent
                  key="flap"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <OptionGroup>
                    <OptionGroupTitle>Couleur du Rabat</OptionGroupTitle>
                    <ColorOptions>
                      {flapColors.map(color => (
                        <ColorSwatch
                          key={color.value}
                          color={color.value}
                          active={config.flapColor === color.value}
                          onClick={() => updateConfig('flapColor', color.value)}
                          title={`${color.name} ${color.price > 0 ? `(+${color.price}€)` : ''}`}
                        />
                      ))}
                    </ColorOptions>
                  </OptionGroup>

                  <OptionGroup>
                    <OptionGroupTitle>Matériau du Rabat</OptionGroupTitle>
                    <MaterialOptions>
                      {materials.map(material => (
                        <OptionButton
                          key={material.value}
                          active={config.flapMaterial === material.value}
                          onClick={() => updateConfig('flapMaterial', material.value)}
                        >
                          <div>{material.name}</div>
                          <small>
                            {material.price > 0 ? `+${material.price}€` : 
                             material.price < 0 ? `${material.price}€` : 'Inclus'}
                          </small>
                        </OptionButton>
                      ))}
                    </MaterialOptions>
                  </OptionGroup>
                </TabContent>
              )}
            </AnimatePresence>
          </div>
        </ConfiguratorInterface>
      </Container>
    </ConfiguratorSection>
  );
};

export default Configurator;
