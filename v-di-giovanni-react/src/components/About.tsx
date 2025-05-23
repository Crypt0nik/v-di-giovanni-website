import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Leaf, Award, Heart, Recycle } from 'lucide-react';
import { Container, SectionTitle, SectionSubtitle } from '../styles/GlobalStyles';

const AboutSection = styled.section`
  padding: 5rem 0;

  @media (max-width: 768px) {
    padding: 3rem 0;
  }
`;

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const AboutText = styled.div`
  font-size: 1.1rem;
  line-height: 1.8;

  p {
    margin-bottom: 1.5rem;
    color: var(--text-light);
  }

  h3 {
    font-family: 'Playfair Display', serif;
    color: var(--text-dark);
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const AboutValues = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const ValueItem = styled(motion.div)`
  text-align: center;
  padding: 1.5rem;
  background: var(--white);
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.05);

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ValueIcon = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;

  svg {
    font-size: 2.5rem;
    color: var(--primary-color);
    width: 40px;
    height: 40px;
  }

  @media (max-width: 768px) {
    svg {
      width: 32px;
      height: 32px;
    }
  }
`;

const ValueTitle = styled.h4`
  font-family: 'Playfair Display', serif;
  margin-bottom: 0.5rem;
  color: var(--text-dark);

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ValueDescription = styled.p`
  color: var(--text-light);
  font-size: 0.9rem;
`;

const About: React.FC = () => {
  const values = [
    {
      icon: <Leaf />,
      title: "Éco-Responsable",
      description: "Matériaux durables et processus respectueux de l'environnement"
    },
    {
      icon: <Award />,
      title: "Made in France",
      description: "Savoir-faire artisanal français et qualité premium"
    },
    {
      icon: <Heart />,
      title: "Créativité",
      description: "Designs uniques pensés pour votre liberté d'expression"
    },
    {
      icon: <Recycle />,
      title: "Modulable",
      description: "Un sac qui évolue avec vos envies et vos besoins"
    }
  ];

  return (
    <AboutSection id="about">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <SectionTitle>À Propos de V. Di Giovanni</SectionTitle>
          <SectionSubtitle>
            Une marque française qui révolutionne la maroquinerie avec des créations 
            modulables, élégantes et responsables.
          </SectionSubtitle>
        </motion.div>

        <AboutContent>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <AboutText>
              <h3>Notre Histoire</h3>
              <p>
                Fondée par une passionnée de mode et d'innovation, V. Di Giovanni naît d'une vision simple : 
                créer des sacs à main qui s'adaptent à la femme moderne, pas l'inverse.
              </p>
              <p>
                Chaque pièce est conçue dans nos ateliers français avec un savoir-faire artisanal 
                transmis de génération en génération, alliant tradition et modernité.
              </p>
              <p>
                Notre engagement ? Vous offrir la liberté de réinventer votre style au quotidien 
                avec des créations durables, élégantes et infiniment personnalisables.
              </p>
            </AboutText>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <AboutValues>
              {values.map((value, index) => (
                <ValueItem
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <ValueIcon>
                    {value.icon}
                  </ValueIcon>
                  <ValueTitle>{value.title}</ValueTitle>
                  <ValueDescription>{value.description}</ValueDescription>
                </ValueItem>
              ))}
            </AboutValues>
          </motion.div>
        </AboutContent>
      </Container>
    </AboutSection>
  );
};

export default About;
