import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';

const FooterContainer = styled.footer`
  padding: 2rem 1rem;
  background-color: ${props => props.theme.dark ? 'var(--bg-dark)' : 'var(--bg-light)'};
  color: ${props => props.theme.dark ? 'var(--text-dark)' : 'var(--text-light)'};
  margin-top: auto;
  border-top: 1px solid ${props => props.theme.dark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 2fr 1fr 1fr;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 50px;
    height: 2px;
    background: linear-gradient(to right, var(--red), var(--violet));
  }
`;

const FooterLink = styled(Link)`
  color: ${props => props.theme.dark ? 'var(--text-dark)' : 'var(--text-light)'};
  text-decoration: none;
  transition: color 0.2s;
  margin-bottom: 0.5rem;
  
  &:hover {
    color: var(--primary);
  }
`;

const RainbowText = styled.span`
  background: linear-gradient(to right, var(--red), var(--orange), var(--yellow), var(--green), var(--blue), var(--indigo), var(--violet));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
`;

const FooterBottom = styled.div`
  text-align: center;
  padding-top: 2rem;
  margin-top: 2rem;
  border-top: 1px solid ${props => props.theme.dark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'};
  font-size: 0.875rem;
`;

const Footer = () => {
  const { dark } = useTheme();
  
  return (
    <FooterContainer theme={{ dark }}>
      <FooterContent>
        <FooterSection>
          <FooterTitle>Rainbow Sorter</FooterTitle>
          <p>
            Una aplicación educativa y divertida para aprender sobre el orden de los colores
            en el arcoíris mientras te diviertes.
          </p>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Enlaces</FooterTitle>
          <FooterLink to="/" theme={{ dark }}>Inicio</FooterLink>
          <FooterLink to="/play" theme={{ dark }}>Jugar</FooterLink>
          <FooterLink to="/learn" theme={{ dark }}>Aprender</FooterLink>
          <FooterLink to="/about" theme={{ dark }}>Acerca de</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Contacto</FooterTitle>
          <FooterLink as="a" href="mailto:info@rainbowsorter.com" theme={{ dark }}>
            info@rainbowsorter.com
          </FooterLink>
          <p>¡Síguenos en redes sociales!</p>
        </FooterSection>
      </FooterContent>
      
      <FooterBottom theme={{ dark }}>
        <p>&copy; {new Date().getFullYear()} <RainbowText>Rainbow Sorter</RainbowText>. Todos los derechos reservados.</p>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer; 