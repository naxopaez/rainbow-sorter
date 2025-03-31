import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
  opacity: ${props => props.theme.dark ? 0.2 : 0.15};
  pointer-events: none;
`;

const CircleBlur = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  filter: blur(${props => props.size * 0.7}px);
  background: ${props => props.color};
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  opacity: ${props => props.opacity};
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${props => props.theme.dark 
    ? 'radial-gradient(circle at center, transparent 40%, var(--bg-dark) 95%)'
    : 'radial-gradient(circle at center, transparent 40%, var(--bg-light) 95%)'
  };
`;

const AnimatedBackground = ({ reducedMotion = false }) => {
  const { dark } = useTheme();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);
  
  // Colores del arcoíris con mayor opacidad
  const colors = [
    'rgba(255, 0, 0, 0.7)',    // Rojo
    'rgba(255, 127, 0, 0.7)',  // Naranja
    'rgba(255, 255, 0, 0.7)',  // Amarillo
    'rgba(0, 255, 0, 0.7)',    // Verde
    'rgba(0, 0, 255, 0.7)',    // Azul
    'rgba(75, 0, 130, 0.7)',   // Índigo
    'rgba(139, 0, 255, 0.7)'   // Violeta
  ];
  
  // Obtener las dimensiones del contenedor
  useEffect(() => {
    if (containerRef.current) {
      const updateDimensions = () => {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight
        });
      };
      
      updateDimensions();
      window.addEventListener('resize', updateDimensions);
      
      return () => {
        window.removeEventListener('resize', updateDimensions);
      };
    }
  }, []);
  
  // Generar círculos aleatorios
  const generateCircles = () => {
    const circles = [];
    const minSize = Math.min(dimensions.width, dimensions.height) * 0.15;
    const maxSize = Math.min(dimensions.width, dimensions.height) * 0.45;
    
    // Limitar a 7 círculos, uno para cada color
    for (let i = 0; i < 7; i++) {
      const size = minSize + Math.random() * (maxSize - minSize);
      const x = Math.random() * dimensions.width;
      const y = Math.random() * dimensions.height;
      const color = colors[i % colors.length];
      const opacity = 0.4 + Math.random() * 0.4; // Mayor opacidad
      
      circles.push({
        id: i,
        x, 
        y, 
        size, 
        color,
        opacity
      });
    }
    
    return circles;
  };
  
  const circles = dimensions.width > 0 ? generateCircles() : [];
  
  return (
    <BackgroundContainer ref={containerRef} theme={{ dark }}>
      {circles.map(circle => (
        <CircleBlur
          key={circle.id}
          size={circle.size}
          color={circle.color}
          opacity={circle.opacity}
          initial={{ x: circle.x, y: circle.y }}
          animate={{ 
            x: [circle.x, circle.x + (Math.random() * 150 - 75), circle.x],
            y: [circle.y, circle.y + (Math.random() * 150 - 75), circle.y]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: reducedMotion ? 0 : 15 + Math.random() * 15,
            ease: "easeInOut",
            repeatType: "reverse"
          }}
        />
      ))}
      <GradientOverlay theme={{ dark }} />
    </BackgroundContainer>
  );
};

export default AnimatedBackground; 