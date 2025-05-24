import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyles';
import Header from './components/Header';
import Hero from './components/Hero';
import Products from './components/Products';
import Configurator from './components/Configurator';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import TestBagViewer from './TestBagViewer';

const theme = {
  colors: {
    primary: '#d4af37',
    secondary: '#b8941f',
    dark: '#2c2c2c',
    light: '#f8f8f8',
    gray: '#e0e0e0',
    white: '#ffffff'
  },
  fonts: {
    heading: "'Playfair Display', serif",
    body: "'Inter', sans-serif"
  }
};

function App() {
  // Vérifier si on est sur la page de test
  const isTestPage = window.location.pathname === '/test' || window.location.search.includes('test=true');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Si on est sur la page de test, afficher seulement le testeur
  if (isTestPage) {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <TestBagViewer />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div className="App">
        <Header onNavigate={scrollToSection} />
        <main>
          <Hero onNavigateToConfigurator={() => scrollToSection('configurator')} />
          <Products />
          <Configurator />
          <About />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
