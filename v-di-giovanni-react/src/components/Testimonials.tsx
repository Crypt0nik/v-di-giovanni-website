import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Container, SectionTitle, SectionSubtitle } from '../styles/GlobalStyles';

const TestimonialsSection = styled.section`
  background: var(--secondary-color);
  padding: 5rem 0;

  @media (max-width: 768px) {
    padding: 3rem 0;
  }
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const TestimonialCard = styled(motion.div)`
  background: var(--white);
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.05);

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const StarsContainer = styled.div`
  display: flex;
  gap: 0.25rem;
  margin-bottom: 1rem;

  svg {
    width: 16px;
    height: 16px;
    color: var(--primary-color);
    fill: var(--primary-color);
  }
`;

const TestimonialText = styled.p`
  font-style: italic;
  margin-bottom: 1.5rem;
  color: var(--text-light);
  line-height: 1.6;
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const AuthorAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  font-weight: 600;
  font-size: 1.2rem;
`;

const AuthorInfo = styled.div`
  h5 {
    font-weight: 600;
    margin-bottom: 0.2rem;
    color: var(--text-dark);
  }

  p {
    color: var(--text-light);
    font-size: 0.9rem;
  }
`;

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      text: "Absolument conquise par mon sac V. Di Giovanni ! La qualité est exceptionnelle et j'adore pouvoir changer de style selon mes envies. Un investissement qui en vaut vraiment la peine.",
      author: "Marie L.",
      location: "Paris",
      rating: 5,
      avatar: "ML"
    },
    {
      id: 2,
      text: "Le concept modulaire est génial ! En une seconde, je passe d'un look professionnel à un style décontracté. Mes collègues me demandent toujours où j'ai trouvé ce sac unique.",
      author: "Sophie D.",
      location: "Lyon",
      rating: 5,
      avatar: "SD"
    },
    {
      id: 3,
      text: "Service client parfait et sac d'une qualité remarquable. Le cuir italien est somptueux et les finitions irréprochables. Je recommande vivement cette marque française !",
      author: "Isabelle M.",
      location: "Bordeaux",
      rating: 5,
      avatar: "IM"
    },
    {
      id: 4,
      text: "Enfin un sac qui correspond à ma personnalité changeante ! Les rabats interchangeables me permettent d'avoir plusieurs sacs en un. Innovation et élégance au rendez-vous.",
      author: "Camille R.",
      location: "Nice",
      rating: 5,
      avatar: "CR"
    },
    {
      id: 5,
      text: "Livraison rapide et sac encore plus beau qu'en photos. La personnalisation est facile et le rendu final dépasse mes attentes. Bravo pour cette belle création française !",
      author: "Léa T.",
      location: "Toulouse",
      rating: 5,
      avatar: "LT"
    },
    {
      id: 6,
      text: "Un sac qui fait sensation partout où je vais ! La modularité est parfaite pour quelqu'un comme moi qui aime changer de style. Qualité premium garantie.",
      author: "Émilie B.",
      location: "Lille",
      rating: 5,
      avatar: "EB"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: rating }, (_, i) => (
      <Star key={i} />
    ));
  };

  return (
    <TestimonialsSection id="testimonials">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <SectionTitle>Ce Que Disent Nos Clientes</SectionTitle>
          <SectionSubtitle>
            Découvrez l'expérience V. Di Giovanni à travers les témoignages 
            de nos clientes satisfaites.
          </SectionSubtitle>
        </motion.div>

        <TestimonialsGrid>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <TestimonialCard
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <StarsContainer>
                  {renderStars(testimonial.rating)}
                </StarsContainer>
                
                <TestimonialText>
                  "{testimonial.text}"
                </TestimonialText>
                
                <TestimonialAuthor>
                  <AuthorAvatar>
                    {testimonial.avatar}
                  </AuthorAvatar>
                  <AuthorInfo>
                    <h5>{testimonial.author}</h5>
                    <p>{testimonial.location}</p>
                  </AuthorInfo>
                </TestimonialAuthor>
              </TestimonialCard>
            </motion.div>
          ))}
        </TestimonialsGrid>
      </Container>
    </TestimonialsSection>
  );
};

export default Testimonials;
