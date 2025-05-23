import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactSection = styled.section`
  padding: 80px 0;
  background: ${props => props.theme.colors.light};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const ContactTitle = styled(motion.h2)`
  font-family: ${props => props.theme.fonts.heading};
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  color: ${props => props.theme.colors.dark};
  text-align: center;
  margin-bottom: 60px;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const ContactInfo = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  font-family: ${props => props.theme.fonts.body};
  font-size: 1.1rem;
  color: ${props => props.theme.colors.dark};

  svg {
    color: ${props => props.theme.colors.primary};
    flex-shrink: 0;
  }
`;

const ContactForm = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-family: ${props => props.theme.fonts.body};
  font-weight: 600;
  color: ${props => props.theme.colors.dark};
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 15px;
  border: 2px solid ${props => props.theme.colors.gray};
  border-radius: 8px;
  font-family: ${props => props.theme.fonts.body};
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const TextArea = styled.textarea`
  padding: 15px;
  border: 2px solid ${props => props.theme.colors.gray};
  border-radius: 8px;
  font-family: ${props => props.theme.fonts.body};
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const SubmitButton = styled(motion.button)`
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 8px;
  font-family: ${props => props.theme.fonts.body};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background-color 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.secondary};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled(motion.div)`
  background: #d4edda;
  color: #155724;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  font-family: ${props => props.theme.fonts.body};
`;

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulation d'envoi de formulaire
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <ContactSection id="contact">
      <Container>
        <ContactTitle
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Contactez-nous
        </ContactTitle>

        <ContactGrid>
          <ContactInfo
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <ContactItem>
              <Mail size={24} />
              <div>
                <div>contact@vdigiovanni.fr</div>
                <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '4px' }}>
                  Réponse sous 24h
                </div>
              </div>
            </ContactItem>

            <ContactItem>
              <Phone size={24} />
              <div>
                <div>+33 1 23 45 67 89</div>
                <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '4px' }}>
                  Lun-Ven 9h-18h
                </div>
              </div>
            </ContactItem>

            <ContactItem>
              <MapPin size={24} />
              <div>
                <div>Paris, France</div>
                <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '4px' }}>
                  Atelier de création
                </div>
              </div>
            </ContactItem>

            <div style={{ marginTop: '20px' }}>
              <h3 style={{ 
                fontFamily: 'var(--font-heading)', 
                fontSize: '1.5rem', 
                marginBottom: '15px',
                color: 'var(--color-dark)'
              }}>
                Horaires d'ouverture
              </h3>
              <div style={{ 
                fontFamily: 'var(--font-body)', 
                color: '#666',
                lineHeight: '1.6'
              }}>
                <div>Lundi - Vendredi : 9h00 - 18h00</div>
                <div>Samedi : 10h00 - 16h00</div>
                <div>Dimanche : Fermé</div>
              </div>
            </div>
          </ContactInfo>

          <ContactForm
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
          >
            {isSubmitted && (
              <SuccessMessage
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                Merci pour votre message ! Nous vous répondrons très bientôt.
              </SuccessMessage>
            )}

            <FormGroup>
              <Label htmlFor="name">Nom complet</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Votre nom"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="votre@email.com"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="subject">Sujet</Label>
              <Input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Sujet de votre message"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="message">Message</Label>
              <TextArea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Votre message..."
              />
            </FormGroup>

            <SubmitButton
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                'Envoi en cours...'
              ) : (
                <>
                  <Send size={18} />
                  Envoyer le message
                </>
              )}
            </SubmitButton>
          </ContactForm>
        </ContactGrid>
      </Container>
    </ContactSection>
  );
};

export default Contact;
