import React, { useState } from 'react';
import BagViewer3D from './components/BagViewer3D';
import SimpleBagViewer from './components/SimpleBagViewer';
import styled from 'styled-components';

const TestContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Inter', sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  color: white;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 30px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
`;

const ConfigSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 15px;
  margin: 20px 0;
  backdrop-filter: blur(10px);
`;

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  margin: 20px 0;
`;

const ColorButton = styled.button<{ $color: string; $active: boolean }>`
  background: ${props => props.$color};
  border: 3px solid ${props => props.$active ? '#FFD700' : 'white'};
  border-radius: 10px;
  padding: 15px;
  color: ${props => props.$color === '#F4E6E1' || props.$color === '#D4A574' ? 'black' : 'white'};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-shadow: ${props => props.$color === '#F4E6E1' || props.$color === '#D4A574' ? 'none' : '1px 1px 2px rgba(0,0,0,0.7)'};
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  }
`;

const ViewerSection = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 30px;
  margin: 30px 0;
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
`;

const PresetButtons = styled.div`
  display: flex;
  gap: 10px;
  margin: 20px 0;
  flex-wrap: wrap;
`;

const PresetButton = styled.button<{ $active: boolean }>`
  background: ${props => props.$active ? 'var(--primary-color, #8B4513)' : 'rgba(255,255,255,0.2)'};
  color: ${props => props.$active ? 'white' : 'inherit'};
  border: 2px solid ${props => props.$active ? 'var(--primary-color, #8B4513)' : 'rgba(255,255,255,0.3)'};
  border-radius: 25px;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--primary-color, #8B4513);
    color: white;
    border-color: var(--primary-color, #8B4513);
  }
`;

const InfoPanel = styled.div`
  background: rgba(0,0,0,0.3);
  padding: 15px;
  border-radius: 10px;
  margin: 20px 0;
  font-family: monospace;
  font-size: 14px;
`;

// Couleurs disponibles
const availableColors = [
  { hex: '#D4A574', name: 'Beige Nude' },
  { hex: '#F4E6E1', name: 'Rose Poudré' },
  { hex: '#8B4513', name: 'Marron Cognac' },
  { hex: '#2C2C2C', name: 'Gris Foncé' },
  { hex: '#8B1538', name: 'Bordeaux' },
  { hex: '#1E3A8A', name: 'Bleu Marine' }
];

// Configurations prédéfinies
const presets = [
  {
    name: 'Classique',
    config: {
      bodyColor: '#8B4513',
      bodyMaterial: 'cuir',
      handleColor: '#8B4513', 
      handleType: 'classique',
      flapColor: '#8B4513',
      flapMaterial: 'cuir'
    }
  },
  {
    name: 'Élégant',
    config: {
      bodyColor: '#2C2C2C',
      bodyMaterial: 'cuir',
      handleColor: '#2C2C2C',
      handleType: 'moderne',
      flapColor: '#2C2C2C',
      flapMaterial: 'cuir'
    }
  },
  {
    name: 'Romantique',
    config: {
      bodyColor: '#F4E6E1',
      bodyMaterial: 'cuir',
      handleColor: '#D4A574',
      handleType: 'vintage',
      flapColor: '#F4E6E1',
      flapMaterial: 'cuir'
    }
  },
  {
    name: 'Audacieux',
    config: {
      bodyColor: '#8B1538',
      bodyMaterial: 'cuir',
      handleColor: '#2C2C2C',
      handleType: 'moderne',
      flapColor: '#8B1538',
      flapMaterial: 'cuir'
    }
  }
];

const TestBagViewer: React.FC = () => {
  const [configuration, setConfiguration] = useState(presets[0].config);
  const [activePreset, setActivePreset] = useState(0);
  const [useSimpleViewer, setUseSimpleViewer] = useState(false);

  const updateColor = (part: 'bodyColor' | 'handleColor' | 'flapColor', color: string) => {
    setConfiguration(prev => ({ ...prev, [part]: color }));
    setActivePreset(-1); // Désactiver les presets quand on modifie manuellement
  };

  const selectPreset = (index: number) => {
    setConfiguration(presets[index].config);
    setActivePreset(index);
  };

  return (
    <TestContainer>
      <Title>🎨 Test Configurateur PNG - BagViewer3D</Title>
      
      <ConfigSection>
        <h2>Presets Rapides</h2>
        <PresetButtons>
          {presets.map((preset, index) => (
            <PresetButton
              key={preset.name}
              $active={activePreset === index}
              onClick={() => selectPreset(index)}
            >
              {preset.name}
            </PresetButton>
          ))}
          <PresetButton
            $active={false}
            onClick={() => setUseSimpleViewer(!useSimpleViewer)}
            style={{ background: useSimpleViewer ? '#4CAF50' : '#FF9800', border: 'none' }}
          >
            {useSimpleViewer ? '📊 Version Simple' : '🔄 Version Complexe'}
          </PresetButton>
        </PresetButtons>
      </ConfigSection>

      <ConfigSection>
        <h2>Configuration Manuelle</h2>
        
        <h3>Couleur du Corps</h3>
        <ColorGrid>
          {availableColors.map(color => (
            <ColorButton
              key={`body-${color.hex}`}
              $color={color.hex}
              $active={configuration.bodyColor === color.hex}
              onClick={() => updateColor('bodyColor', color.hex)}
            >
              {color.name}
            </ColorButton>
          ))}
        </ColorGrid>

        <h3>Couleur de la Poignée</h3>
        <ColorGrid>
          {availableColors.map(color => (
            <ColorButton
              key={`handle-${color.hex}`}
              $color={color.hex}
              $active={configuration.handleColor === color.hex}
              onClick={() => updateColor('handleColor', color.hex)}
            >
              {color.name}
            </ColorButton>
          ))}
        </ColorGrid>

        <h3>Couleur du Rabat</h3>
        <ColorGrid>
          {availableColors.map(color => (
            <ColorButton
              key={`flap-${color.hex}`}
              $color={color.hex}
              $active={configuration.flapColor === color.hex}
              onClick={() => updateColor('flapColor', color.hex)}
            >
              {color.name}
            </ColorButton>
          ))}
        </ColorGrid>
      </ConfigSection>

      <ViewerSection>
        <h2 style={{ color: 'var(--primary-color, #8B4513)', textAlign: 'center', marginBottom: '20px' }}>
          Aperçu en Temps Réel - {useSimpleViewer ? 'Version Simple (sans loading)' : 'Version Complexe (avec loading)'}
        </h2>
        {useSimpleViewer ? (
          <SimpleBagViewer configuration={configuration} />
        ) : (
          <BagViewer3D configuration={configuration} />
        )}
      </ViewerSection>

      <InfoPanel>
        <strong>Configuration Actuelle:</strong><br/>
        Corps: {configuration.bodyColor} ({availableColors.find(c => c.hex === configuration.bodyColor)?.name})<br/>
        Poignée: {configuration.handleColor} ({availableColors.find(c => c.hex === configuration.handleColor)?.name})<br/>
        Rabat: {configuration.flapColor} ({availableColors.find(c => c.hex === configuration.flapColor)?.name})<br/>
        Preset actif: {activePreset >= 0 ? presets[activePreset].name : 'Configuration personnalisée'}<br/>
        Mode viewer: {useSimpleViewer ? 'Simple (diagnostic)' : 'Complexe (production)'}
      </InfoPanel>
    </TestContainer>
  );
};

export default TestBagViewer;
