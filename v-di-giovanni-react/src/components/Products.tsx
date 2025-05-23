import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ShoppingBag, Palette, Shuffle } from 'lucide-react';
import { Container, SectionTitle, SectionSubtitle } from '../styles/GlobalStyles';

const ProductsSection = styled.section`
  padding: 5rem 0;

  @media (max-width: 768px) {
    padding: 3rem 0;
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  margin-top: 3rem;

  @media (max-width: 768px) {
    gap: 2rem;
    grid-template-columns: 1fr;
  }
`;

const ProductCard = styled(motion.div)`
  background: var(--white);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }
`;

const ProductImage = styled.div`
  height: 300px;
  background: var(--secondary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  color: var(--primary-color);

  @media (max-width: 768px) {
    height: 250px;
    font-size: 3rem;
  }
`;

const ProductInfo = styled.div`
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const ProductTitle = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const ProductDescription = styled.p`
  color: var(--text-light);
  margin-bottom: 1.5rem;
`;

const ProductFeatures = styled.ul`
  list-style: none;
`;

const ProductFeature = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  color: var(--text-light);

  svg {
    color: var(--primary-color);
    margin-right: 0.5rem;
    width: 16px;
    height: 16px;
  }
`;

const Products: React.FC = () => {
  const products = [
    {
      id: 1,
      name: "Le Modulaire Classic",
      description: "Notre sac signature avec rabats interchangeables et anses amovibles pour un style toujours renouvelé.",
      icon: <ShoppingBag />,
      features: [
        "3 rabats interchangeables inclus",
        "Anses amovibles cuir et chaîne",
        "Compartiments modulables",
        "Cuir italien premium"
      ]
    },
    {
      id: 2,
      name: "Le Créatif",
      description: "Libérez votre créativité avec ce sac entièrement personnalisable selon vos envies du moment.",
      icon: <Palette />,
      features: [
        "5 options de couleurs",
        "Matériaux éco-responsables",
        "Broderie personnalisée",
        "Accessoires assortis"
      ]
    },
    {
      id: 3,
      name: "Le Transformable",
      description: "Un sac, multiples possibilités. Transformez-le selon l'occasion : travail, soirée ou week-end.",
      icon: <Shuffle />,
      features: [
        "Mode jour/soir",
        "Bandoulière ajustable",
        "Pochette détachable",
        "Finitions artisanales"
      ]
    }
  ];

  return (
    <ProductsSection id="products">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <SectionTitle>Nos Sacs Modulables</SectionTitle>
          <SectionSubtitle>
            Découvrez notre collection unique de sacs à main conçus pour s'adapter 
            à votre style et à vos besoins, avec l'élégance française.
          </SectionSubtitle>
        </motion.div>

        <ProductsGrid>
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <ProductCard
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <ProductImage>
                  {product.icon}
                </ProductImage>
                <ProductInfo>
                  <ProductTitle>{product.name}</ProductTitle>
                  <ProductDescription>{product.description}</ProductDescription>
                  <ProductFeatures>
                    {product.features.map((feature, featureIndex) => (
                      <ProductFeature key={featureIndex}>
                        <span>✓</span>
                        {feature}
                      </ProductFeature>
                    ))}
                  </ProductFeatures>
                </ProductInfo>
              </ProductCard>
            </motion.div>
          ))}
        </ProductsGrid>
      </Container>
    </ProductsSection>
  );
};

export default Products;
