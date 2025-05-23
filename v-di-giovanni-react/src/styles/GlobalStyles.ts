import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --primary-color: #d4a574;
    --secondary-color: #f8f5f1;
    --accent-color: #8b6f47;
    --text-dark: #2c2c2c;
    --text-light: #666;
    --white: #ffffff;
    --pink-accent: #f4e6e1;
    --gold-accent: #e8d5b7;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Inter', sans-serif;
    line-height: 1.6;
    color: var(--text-dark);
    background-color: var(--white);
    overflow-x: hidden;
    width: 100%;
    min-height: 100vh;
  }

  #root {
    width: 100%;
    min-height: 100vh;
  }

  .App {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  main {
    flex: 1;
    width: 100%;
  }

  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;

  @media (max-width: 768px) {
    padding: 0 15px;
  }
`;

export const SectionTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  color: var(--text-dark);

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
`;

export const SectionSubtitle = styled.p`
  text-align: center;
  color: var(--text-light);
  margin-bottom: 4rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    margin-bottom: 2.5rem;
  }
`;

export const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  display: inline-block;
  background: ${props => props.variant === 'secondary' ? 'transparent' : 'var(--primary-color)'};
  color: ${props => props.variant === 'secondary' ? 'var(--primary-color)' : 'var(--white)'};
  border: ${props => props.variant === 'secondary' ? '2px solid var(--primary-color)' : 'none'};
  padding: 1rem 2rem;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  font-family: inherit;

  &:hover {
    background: ${props => props.variant === 'secondary' ? 'var(--primary-color)' : 'var(--accent-color)'};
    color: var(--white);
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(212, 165, 116, 0.3);
  }

  @media (max-width: 768px) {
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;
  }
`;
