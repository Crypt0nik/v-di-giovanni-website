import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock, MessageCircle, Star } from 'lucide-react';

const ContactSection = styled.section`
  padding: 100px 0;
  background: linear-gradient(135deg, var(--secondary-color) 0%, #faf8f5 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--primary-color), transparent);
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const ContactHeader = styled.div`
  text-align: center;
  margin-bottom: 80px;
`;

const ContactTitle = styled(motion.h2)`
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.8rem, 5vw, 3.8rem);
  color: var(--text-dark);
  margin-bottom: 20px;
  font-weight: 600;
`;

const ContactSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: var(--text-light);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: start;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 60px;
  }
`;

const ContactInfoSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const InfoCard = styled(motion.div)`
  background: var(--white);
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(212, 165, 116, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
  }
`;

const InfoHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
`;

const IconWrapper = styled.div`
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
`;

const InfoTitle = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem;
  color: var(--text-dark);
  margin: 0;
`;

const InfoContent = styled.div`
  color: var(--text-light);
  line-height: 1.6;
  
  strong {
    color: var(--text-dark);
    font-weight: 600;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 12px;
  
  &:last-child {
    margin-bottom: 0;
  }

  svg {
    color: var(--primary-color);
    flex-shrink: 0;
    margin-top: 2px;
  }
`;

const ContactDetail = styled.div`
  font-family: 'Inter', sans-serif;
  
  .main {
    font-size: 1rem;
    color: var(--text-dark);
    font-weight: 500;
    margin-bottom: 4px;
  }
  
  .sub {
    font-size: 0.9rem;
    color: var(--text-light);
  }
`;

const ContactForm = styled(motion.div)`
  background: var(--white);
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(212, 165, 116, 0.1);
`;

const FormHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const FormTitle = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 1.8rem;
  color: var(--text-dark);
  margin-bottom: 10px;
`;

const FormSubtitle = styled.p`
  color: var(--text-light);
  font-size: 0.95rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 25px;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  color: var(--text-dark);
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 16px 20px;
  border: 2px solid #e1e5e9;
  border-radius: 12px;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  background: #fafafa;
  transition: all 0.3s ease;
  color: var(--text-dark);

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    background: var(--white);
    box-shadow: 0 0 0 3px rgba(212, 165, 116, 0.1);
  }

  &::placeholder {
    color: #a0a0a0;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 16px 20px;
  border: 2px solid #e1e5e9;
  border-radius: 12px;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  background: #fafafa;
  transition: all 0.3s ease;
  color: var(--text-dark);

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    background: var(--white);
    box-shadow: 0 0 0 3px rgba(212, 165, 116, 0.1);
  }

  &::placeholder {
    color: #a0a0a0;
  }
`;

const SubmitButton = styled(motion.button)`
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  color: var(--white);
  border: none;
  padding: 18px 30px;
  border-radius: 12px;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(212, 165, 116, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const SuccessMessage = styled(motion.div)`
  background: linear-gradient(135deg, #d4edda, #c3e6cb);
  color: #155724;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  border: 1px solid #c3e6cb;
  margin-bottom: 20px;
`;

const TrustIndicators = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px solid #e1e5e9;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
`;

const TrustItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: var(--text-light);

  svg {
    color: var(--primary-color);
  }
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
        <ContactHeader>
          <ContactTitle
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Contactez-nous
          </ContactTitle>
          <ContactSubtitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Nous sommes là pour répondre à toutes vos questions et vous accompagner dans la création de votre sac idéal.
          </ContactSubtitle>
        </ContactHeader>

        <ContactGrid>
          <ContactInfoSection
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <InfoCard
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <InfoHeader>
                <IconWrapper>
                  <MessageCircle size={24} />
                </IconWrapper>
                <InfoTitle>Nous contacter</InfoTitle>
              </InfoHeader>
              <InfoContent>
                <ContactItem>
                  <Mail size={18} />
                  <ContactDetail>
                    <div className="main">contact@vdigiovanni.fr</div>
                    <div className="sub">Réponse garantie sous 24h</div>
                  </ContactDetail>
                </ContactItem>
                <ContactItem>
                  <Phone size={18} />
                  <ContactDetail>
                    <div className="main">+33 1 23 45 67 89</div>
                    <div className="sub">Service client dédié</div>
                  </ContactDetail>
                </ContactItem>
              </InfoContent>
            </InfoCard>

            <InfoCard
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <InfoHeader>
                <IconWrapper>
                  <MapPin size={24} />
                </IconWrapper>
                <InfoTitle>Notre Atelier</InfoTitle>
              </InfoHeader>
              <InfoContent>
                <ContactItem>
                  <MapPin size={18} />
                  <ContactDetail>
                    <div className="main">Paris, France</div>
                    <div className="sub">Atelier de création artisanale</div>
                  </ContactDetail>
                </ContactItem>
                <p style={{ marginTop: '15px', color: 'var(--text-light)' }}>
                  Venez découvrir notre atelier et rencontrer nos artisans. 
                  <strong> Sur rendez-vous uniquement.</strong>
                </p>
              </InfoContent>
            </InfoCard>

            <InfoCard
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <InfoHeader>
                <IconWrapper>
                  <Clock size={24} />
                </IconWrapper>
                <InfoTitle>Horaires</InfoTitle>
              </InfoHeader>
              <InfoContent>
                <ContactItem>
                  <Clock size={18} />
                  <ContactDetail>
                    <div className="main">Lundi - Vendredi</div>
                    <div className="sub">9h00 - 18h00</div>
                  </ContactDetail>
                </ContactItem>
                <ContactItem>
                  <Clock size={18} />
                  <ContactDetail>
                    <div className="main">Samedi</div>
                    <div className="sub">10h00 - 16h00</div>
                  </ContactDetail>
                </ContactItem>
                <ContactItem>
                  <Clock size={18} />
                  <ContactDetail>
                    <div className="main">Dimanche</div>
                    <div className="sub">Fermé</div>
                  </ContactDetail>
                </ContactItem>
              </InfoContent>
            </InfoCard>
          </ContactInfoSection>

          <ContactForm
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <FormHeader>
              <FormTitle>Envoyez-nous un message</FormTitle>
              <FormSubtitle>Nous vous répondrons dans les plus brefs délais</FormSubtitle>
            </FormHeader>

            {isSubmitted && (
              <SuccessMessage
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                ✨ Merci pour votre message ! Nous vous répondrons très bientôt.
              </SuccessMessage>
            )}

            <Form onSubmit={handleSubmit}>
              <FormRow>
                <FormGroup>
                  <Label htmlFor="name">Nom complet</Label>
                  <InputWrapper>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Votre nom"
                    />
                  </InputWrapper>
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="email">Email</Label>
                  <InputWrapper>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="votre@email.com"
                    />
                  </InputWrapper>
                </FormGroup>
              </FormRow>

              <FormGroup>
                <Label htmlFor="subject">Sujet</Label>
                <InputWrapper>
                  <Input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Sujet de votre message"
                  />
                </InputWrapper>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="message">Message</Label>
                <TextArea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Décrivez-nous votre projet ou posez-nous vos questions..."
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

              <TrustIndicators>
                <TrustItem>
                  <Star size={16} />
                  Réponse sous 24h
                </TrustItem>
                <TrustItem>
                  <MessageCircle size={16} />
                  Support personnalisé
                </TrustItem>
                <TrustItem>
                  <Clock size={16} />
                  Conseils d'experts
                </TrustItem>
              </TrustIndicators>
            </Form>
          </ContactForm>
        </ContactGrid>
      </Container>
    </ContactSection>
  );
};

export default Contact;
