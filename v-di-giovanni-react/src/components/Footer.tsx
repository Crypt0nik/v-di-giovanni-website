import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin, Heart } from 'lucide-react';

const FooterSection = styled.footer`
  background: ${props => props.theme.colors.dark};
  color: white;
  padding: 60px 0 20px;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 40px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 25px;
  }
`;

const FooterColumn = styled(motion.div)`
  display: flex;
  flex-direction: column;
`;

const FooterTitle = styled.h3`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 1.3rem;
  margin-bottom: 20px;
  color: ${props => props.theme.colors.primary};
`;

const FooterLink = styled.a`
  color: #ccc;
  text-decoration: none;
  margin-bottom: 10px;
  font-family: ${props => props.theme.fonts.body};
  transition: color 0.3s ease;
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const FooterText = styled.p`
  color: #ccc;
  font-family: ${props => props.theme.fonts.body};
  line-height: 1.6;
  margin-bottom: 15px;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 10px;
`;

const SocialLink = styled.a`
  color: #ccc;
  transition: color 0.3s ease;
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  color: #ccc;
  font-family: ${props => props.theme.fonts.body};
  font-size: 0.9rem;

  svg {
    color: ${props => props.theme.colors.primary};
    flex-shrink: 0;
  }
`;

const NewsletterForm = styled.form`
  display: flex;
  margin-top: 15px;
  gap: 10px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const NewsletterInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #555;
  border-radius: 4px;
  background: #333;
  color: white;
  font-family: ${props => props.theme.fonts.body};

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }

  &::placeholder {
    color: #999;
  }
`;

const NewsletterButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-family: ${props => props.theme.fonts.body};
  transition: background-color 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.secondary};
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid #333;
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Copyright = styled.p`
  color: #999;
  font-family: ${props => props.theme.fonts.body};
  font-size: 0.9rem;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const LegalLinks = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const LegalLink = styled.a`
  color: #999;
  text-decoration: none;
  font-family: ${props => props.theme.fonts.body};
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const Footer: React.FC = () => {
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique d'abonnement à la newsletter
    console.log('Newsletter subscription');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <FooterSection>
      <Container>
        <FooterContent>
          <FooterColumn
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <FooterTitle>V. Di Giovanni</FooterTitle>
            <FooterText>
              L'art de la maroquinerie modulaire française. Créez votre sac unique avec notre système innovant de personnalisation.
            </FooterText>
            <SocialLinks>
              <SocialLink href="#" aria-label="Instagram">
                <Instagram size={20} />
              </SocialLink>
              <SocialLink href="#" aria-label="Facebook">
                <Facebook size={20} />
              </SocialLink>
              <SocialLink href="#" aria-label="Twitter">
                <Twitter size={20} />
              </SocialLink>
            </SocialLinks>
          </FooterColumn>

          <FooterColumn
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <FooterTitle>Navigation</FooterTitle>
            <FooterLink onClick={() => scrollToSection('hero')}>Accueil</FooterLink>
            <FooterLink onClick={() => scrollToSection('products')}>Produits</FooterLink>
            <FooterLink onClick={() => scrollToSection('configurator')}>Configurateur</FooterLink>
            <FooterLink onClick={() => scrollToSection('about')}>À propos</FooterLink>
            <FooterLink onClick={() => scrollToSection('testimonials')}>Témoignages</FooterLink>
            <FooterLink onClick={() => scrollToSection('contact')}>Contact</FooterLink>
          </FooterColumn>

          <FooterColumn
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <FooterTitle>Contact</FooterTitle>
            <ContactInfo>
              <Mail size={16} />
              <span>contact@vdigiovanni.fr</span>
            </ContactInfo>
            <ContactInfo>
              <Phone size={16} />
              <span>+33 1 23 45 67 89</span>
            </ContactInfo>
            <ContactInfo>
              <MapPin size={16} />
              <span>Paris, France</span>
            </ContactInfo>
            <FooterText style={{ marginTop: '15px', fontSize: '0.9rem' }}>
              Livraison gratuite en France métropolitaine dès 150€ d'achat.
            </FooterText>
          </FooterColumn>

          <FooterColumn
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <FooterTitle>Newsletter</FooterTitle>
            <FooterText>
              Recevez nos dernières créations et offres exclusives.
            </FooterText>
            <NewsletterForm onSubmit={handleNewsletterSubmit}>
              <NewsletterInput
                type="email"
                placeholder="Votre email"
                required
              />
              <NewsletterButton type="submit">
                S'abonner
              </NewsletterButton>
            </NewsletterForm>
          </FooterColumn>
        </FooterContent>

        <FooterBottom>
          <Copyright>
            © 2024 V. Di Giovanni. Fait avec <Heart size={14} color="#e74c3c" /> à Paris.
          </Copyright>
          <LegalLinks>
            <LegalLink href="#">Mentions légales</LegalLink>
            <LegalLink href="#">Politique de confidentialité</LegalLink>
            <LegalLink href="#">CGV</LegalLink>
            <LegalLink href="#">Retours</LegalLink>
          </LegalLinks>
        </FooterBottom>
      </Container>
    </FooterSection>
  );
};

export default Footer;
