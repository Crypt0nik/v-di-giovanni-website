import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

const ContactSection = styled.section`
  padding: 60px 0;
  background: var(--secondary-color);
`;

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
`;

const ContactTitle = styled(motion.h2)`
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  color: var(--text-dark);
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ContactSubtitle = styled(motion.p)`
  font-size: 1.1rem;
  color: var(--text-light);
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const ContactCard = styled(motion.div)`
  background: var(--white);
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 8px 25px rgba(0,0,0,0.08);
`;

const ContactInfo = styled.div`
  margin-bottom: 2rem;
`;

const InfoItem = styled.div`
  margin-bottom: 1rem;
  
  .label {
    font-size: 0.9rem;
    color: var(--text-light);
    margin-bottom: 0.25rem;
  }
  
  .value {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text-dark);
  }
`;

const EmailButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--primary-color);
  color: var(--white);
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: var(--accent-color);
    transform: translateY(-1px);
  }
`;

const Contact: React.FC = () => {
  return (
    <ContactSection id="contact">
      <Container>
        <ContactTitle
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Contactez-nous
        </ContactTitle>
        
        <ContactSubtitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Une question ? Un projet sur mesure ? Nous sommes là pour vous accompagner.
        </ContactSubtitle>

        <ContactCard
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <ContactInfo>
            <InfoItem>
              <div className="label">Email</div>
              <div className="value">contact@vdigiovanni.fr</div>
            </InfoItem>

            <InfoItem>
              <div className="label">Téléphone</div>
              <div className="value">+33 1 23 45 67 89</div>
            </InfoItem>

            <InfoItem>
              <div className="label">Atelier</div>
              <div className="value">Paris, France</div>
            </InfoItem>
          </ContactInfo>

          <EmailButton
            href="mailto:contact@vdigiovanni.fr"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail size={20} />
            Écrivez-nous
          </EmailButton>
        </ContactCard>
      </Container>
    </ContactSection>
  );
};

export default Contact;
