import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Container, Button } from '../styles/GlobalStyles';
import HeroBag3DNew from './HeroBag3DNew';

const HeroSection = styled.section`
  height: 100vh;
  background: linear-gradient(135deg, var(--secondary-color) 0%, var(--pink-accent) 100%);
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const HeroContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
`;

const HeroText = styled.div`
  @media (max-width: 768px) {
    order: 2;
  }
`;

const HeroTitle = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 3.5rem;
  font-weight: 300;
  margin-bottom: 1.5rem;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  color: var(--text-light);
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
`;

const HeroImageContainer = styled.div`
  text-align: center;
  position: relative;

  @media (max-width: 768px) {
    order: 1;
  }
`;

interface HeroProps {
  onNavigateToConfigurator: () => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigateToConfigurator }) => {
  return (
    <HeroSection id="home">
      <Container>
        <HeroContent>
          <HeroText>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <HeroTitle>
                Sacs à Main<br />
                <span style={{ color: 'var(--primary-color)' }}>Modulables</span>
              </HeroTitle>
              <HeroSubtitle>
                Créez votre sac unique avec nos designs modulables et personnalisables. 
                L'élégance française rencontre l'innovation.
              </HeroSubtitle>
              <Button onClick={onNavigateToConfigurator}>
                Personnaliser le Vôtre
              </Button>
            </motion.div>
          </HeroText>

          <HeroImageContainer>
            <HeroBag3DNew />
          </HeroImageContainer>
        </HeroContent>
      </Container>
    </HeroSection>
  );
};

export default Hero;
