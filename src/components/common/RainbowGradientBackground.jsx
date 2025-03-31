import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const BackgroundContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
  opacity: ${props => props.theme.dark ? 0.3 : 0.2};
  border-radius: 12px;
`;

const GradientCanvas = styled.canvas`
  width: 100%;
  height: 100%;
  opacity: ${props => props.theme.dark ? 0.9 : 0.75};
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${props => props.theme.dark 
    ? 'radial-gradient(circle at center, transparent 30%, var(--bg-dark) 85%)' 
    : 'radial-gradient(circle at center, transparent 30%, var(--bg-light) 85%)'
  };
  border-radius: 12px;
`;

const RainbowGradientBackground = ({ reducedMotion = false }) => {
  const { dark } = useTheme();
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width = canvas.clientWidth;
    let height = canvas.clientHeight;
    
    // Establecer el tamaño real del canvas (para evitar pixelado)
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    
    // Valor inicial para la animación
    let offset = 0;
    
    // Función para dibujar el gradiente arcoíris
    const drawRainbowGradient = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Crear un gradiente que se mueve suavemente
      const gradient = ctx.createLinearGradient(
        width * Math.sin(offset * 0.01) * 0.3 + width * 0.5, 
        height * Math.cos(offset * 0.01) * 0.3 + height * 0.5, 
        width * Math.cos(offset * 0.01) * 0.3 + width * 0.5, 
        height * Math.sin(offset * 0.01) * 0.3 + height * 0.5
      );
      
      // Colores del arcoíris con mayor opacidad
      gradient.addColorStop(0, 'rgba(255, 0, 0, 0.8)');
      gradient.addColorStop(0.16, 'rgba(255, 127, 0, 0.8)');
      gradient.addColorStop(0.33, 'rgba(255, 255, 0, 0.8)');
      gradient.addColorStop(0.5, 'rgba(0, 255, 0, 0.8)');
      gradient.addColorStop(0.66, 'rgba(0, 0, 255, 0.8)');
      gradient.addColorStop(0.83, 'rgba(75, 0, 130, 0.8)');
      gradient.addColorStop(1, 'rgba(139, 0, 255, 0.8)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      
      // Actualizar el offset para la animación con un movimiento más rápido
      offset += reducedMotion ? 0 : 0.3;
      
      // Solicitar el siguiente frame si no se prefiere reducir el movimiento
      if (!reducedMotion) {
        animationRef.current = requestAnimationFrame(drawRainbowGradient);
      }
    };
    
    // Iniciar la animación
    drawRainbowGradient();
    
    // Manejar resize
    const handleResize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Limpieza
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [reducedMotion]);
  
  return (
    <BackgroundContainer 
      theme={{ dark }}
      initial={{ opacity: 0 }}
      animate={{ opacity: dark ? 0.3 : 0.2 }}
      transition={{ duration: 1 }}
    >
      <GradientCanvas ref={canvasRef} theme={{ dark }} />
      <GradientOverlay theme={{ dark }} />
    </BackgroundContainer>
  );
};

export default RainbowGradientBackground; 