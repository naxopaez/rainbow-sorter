import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const HeaderContainer = styled.header`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.theme.dark 
    ? 'rgba(18, 18, 18, 0.8)' 
    : 'rgba(255, 255, 255, 0.8)'
  };
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.15);
  position: sticky;
  top: 0;
  z-index: 10;
  backdrop-filter: blur(10px);
  border-bottom: ${props => props.theme.dark 
    ? '1px solid rgba(255, 255, 255, 0.05)' 
    : '1px solid rgba(0, 0, 0, 0.05)'
  };
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  background: linear-gradient(to right, var(--red), var(--orange), var(--yellow), var(--green), var(--blue), var(--indigo), var(--violet));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-decoration: none;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  filter: brightness(1.1) contrast(1.1);
  
  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const NavLink = styled(Link)`
  padding: 0.5rem;
  text-decoration: none;
  color: ${props => props.theme.dark ? 'var(--text-dark)' : 'var(--text-light)'};
  font-weight: 600;
  position: relative;
  transition: all 0.3s;
  
  &:hover {
    color: var(--primary);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(to right, var(--red), var(--orange), var(--yellow), var(--green), var(--blue), var(--indigo), var(--violet));
    transition: width 0.3s;
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const ThemeToggle = styled(motion.button)`
  background: ${props => props.theme.dark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${props => props.theme.dark ? 'var(--text-dark)' : 'var(--text-light)'};
  transition: all 0.3s ease;
  font-size: 1.2rem;
  
  &:hover {
    background-color: ${props => props.theme.dark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'};
    transform: scale(1.05);
  }
`;

const MobileMenuButton = styled.button`
  display: block;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${props => props.theme.dark ? 'var(--text-dark)' : 'var(--text-light)'};
  
  @media (min-width: 768px) {
    display: none;
  }
`;

const NavLinks = styled.div`
  display: none;
  
  @media (min-width: 768px) {
    display: flex;
    gap: 1rem;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  background-color: ${props => props.theme.dark ? 'var(--bg-dark)' : 'white'};
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 100;
  
  @media (min-width: 768px) {
    display: none;
  }
`;

const Header = () => {
  const { dark, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };
  
  return (
    <HeaderContainer theme={{ dark }}>
      <Logo to="/">Rainbow Sorter</Logo>
      
      <Nav>
        <NavLinks>
          <NavLink to="/" theme={{ dark }}>Inicio</NavLink>
          <NavLink to="/play" theme={{ dark }}>Jugar</NavLink>
          <NavLink to="/learn" theme={{ dark }}>Aprender</NavLink>
          <NavLink to="/about" theme={{ dark }}>Acerca de</NavLink>
        </NavLinks>
        
        <ThemeToggle 
          onClick={toggleTheme}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          theme={{ dark }}
        >
          {dark ? '☀️' : '🌙'}
        </ThemeToggle>
        
        <MobileMenuButton 
          onClick={toggleMobileMenu}
          theme={{ dark }}
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </MobileMenuButton>
      </Nav>
      
      {mobileMenuOpen && (
        <MobileMenu
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          theme={{ dark }}
        >
          <NavLink to="/" theme={{ dark }} onClick={toggleMobileMenu}>Inicio</NavLink>
          <NavLink to="/play" theme={{ dark }} onClick={toggleMobileMenu}>Jugar</NavLink>
          <NavLink to="/learn" theme={{ dark }} onClick={toggleMobileMenu}>Aprender</NavLink>
          <NavLink to="/about" theme={{ dark }} onClick={toggleMobileMenu}>Acerca de</NavLink>
        </MobileMenu>
      )}
    </HeaderContainer>
  );
};

export default Header; 