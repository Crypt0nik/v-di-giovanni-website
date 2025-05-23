import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { Container, Button } from '../styles/GlobalStyles';

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

const HeroBagIcon = styled(motion.div)`
  width: 300px;
  height: 300px;
  background: var(--white);
  border-radius: 20px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 6rem;
  color: var(--primary-color);
  filter: drop-shadow(0 20px 40px rgba(0,0,0,0.1));

  @media (max-width: 768px) {
    width: 250px;
    height: 250px;
    font-size: 4rem;
  }

  @media (max-width: 480px) {
    width: 200px;
    height: 200px;
    font-size: 3rem;
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
            <HeroBagIcon
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <ShoppingBag />
            </HeroBagIcon>
          </HeroImageContainer>
        </HeroContent>
      </Container>
    </HeroSection>
  );
};

export default Hero;
