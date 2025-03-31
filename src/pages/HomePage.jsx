import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Button from '../components/common/Button';
import { useTheme } from '../contexts/ThemeContext';

const HeroSection = styled.section`
  text-align: center;
  padding: 3rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  position: relative;
  overflow: hidden;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(to right, var(--red), var(--orange), var(--yellow), var(--green), var(--blue), var(--indigo), var(--violet));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (min-width: 768px) {
    font-size: 4rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  max-width: 600px;
  line-height: 1.6;
  color: ${props => props.theme.dark ? 'var(--text-dark)' : 'var(--text-light)'};
  
  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const FeaturesSection = styled.section`
  padding: 3rem 1rem;
  background-color: ${props => props.theme.dark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.02)'};
  border-radius: 16px;
  margin: 2rem 0;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: linear-gradient(to right, var(--primary), var(--secondary));
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const FeatureCard = styled(motion.div)`
  background-color: ${props => props.theme.dark ? 'var(--bg-dark)' : 'white'};
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  text-align: center;
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: var(--primary);
`;

const FeatureTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  color: ${props => props.theme.dark ? 'var(--text-dark)' : 'var(--text-light)'};
`;

const RainbowCircle = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: conic-gradient(
    var(--red),
    var(--orange),
    var(--yellow),
    var(--green),
    var(--blue),
    var(--indigo),
    var(--violet),
    var(--red)
  );
  opacity: 0.1;
  z-index: -1;
`;

const HomePage = () => {
  const { dark } = useTheme();
  
  const features = [
    {
      icon: '🎮',
      title: 'Juego Interactivo',
      description: 'Arrastra y suelta los colores para formar un arcoíris perfecto mientras aprendes el orden correcto.'
    },
    {
      icon: '📚',
      title: 'Educativo',
      description: 'Aprende sobre la ciencia detrás de los arcoíris y la importancia de los colores en la naturaleza.'
    },
    {
      icon: '🏆',
      title: 'Niveles Progresivos',
      description: 'Aumenta la dificultad mientras avanzas y desbloquea nuevos retos y modos de juego.'
    }
  ];
  
  return (
    <>
      <HeroSection>
        <RainbowCircle
          style={{ width: '600px', height: '600px', top: '-20%', right: '-20%' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        />
        <RainbowCircle
          style={{ width: '400px', height: '400px', bottom: '-15%', left: '-15%' }}
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
        
        <HeroTitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Rainbow Sorter
        </HeroTitle>
        
        <HeroSubtitle
          theme={{ dark }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Aprende de forma divertida el orden correcto de los colores del arcoíris mientras 
          desarrollas tus habilidades de organización y memoria.
        </HeroSubtitle>
        
        <ButtonGroup
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Button
            as={Link}
            to="/play"
            variant="rainbow"
            size="large"
          >
            Empezar a jugar
          </Button>
          
          <Button
            as={Link}
            to="/learn"
            variant="secondary"
            size="large"
          >
            Aprender más
          </Button>
        </ButtonGroup>
      </HeroSection>
      
      <FeaturesSection theme={{ dark }}>
        <SectionTitle>¿Por qué Rainbow Sorter?</SectionTitle>
        
        <FeatureGrid>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              theme={{ dark }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <FeatureIcon>{feature.icon}</FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription theme={{ dark }}>
                {feature.description}
              </FeatureDescription>
            </FeatureCard>
          ))}
        </FeatureGrid>
      </FeaturesSection>
    </>
  );
};

export default HomePage; 