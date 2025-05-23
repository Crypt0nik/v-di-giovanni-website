import React, { useState } from 'react';
import styled from 'styled-components';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  z-index: 1000;
  transition: all 0.3s ease;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
`;

const Logo = styled.a`
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  font-weight: 600;
  color: var(--primary-color);
  text-decoration: none;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const NavLinks = styled.ul<{ isOpen: boolean }>`
  display: flex;
  list-style: none;
  gap: 2rem;

  @media (max-width: 768px) {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(10px);
    flex-direction: column;
    padding: 2rem;
    gap: 1.5rem;
    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
    transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(-100%)'};
    opacity: ${props => props.isOpen ? '1' : '0'};
    visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
    transition: all 0.3s ease;
  }
`;

const NavLink = styled.a`
  text-decoration: none;
  color: var(--text-dark);
  font-weight: 500;
  transition: color 0.3s ease;
  cursor: pointer;

  &:hover {
    color: var(--primary-color);
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-dark);

  @media (max-width: 768px) {
    display: block;
  }
`;

interface HeaderProps {
  onNavigate: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (section: string) => {
    setIsMenuOpen(false);
    onNavigate(section);
  };

  return (
    <HeaderContainer>
      <Nav>
        <Logo onClick={() => handleNavigation('home')}>V. Di Giovanni</Logo>
        
        <NavLinks isOpen={isMenuOpen}>
          <li><NavLink onClick={() => handleNavigation('home')}>Accueil</NavLink></li>
          <li><NavLink onClick={() => handleNavigation('products')}>Nos Sacs</NavLink></li>
          <li><NavLink onClick={() => handleNavigation('configurator')}>Personnaliser</NavLink></li>
          <li><NavLink onClick={() => handleNavigation('about')}>À Propos</NavLink></li>
          <li><NavLink onClick={() => handleNavigation('testimonials')}>Témoignages</NavLink></li>
          <li><NavLink onClick={() => handleNavigation('contact')}>Contact</NavLink></li>
        </NavLinks>

        <MobileMenuButton 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu mobile"
        >
          <AnimatePresence mode="wait">
            {isMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </MobileMenuButton>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
