import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const PageContainer = styled.div`
  padding: 2rem 0;
  max-width: 800px;
  margin: 0 auto;
`;

const PageTitle = styled(motion.h1)`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;
`;

const Section = styled.section`
  margin-bottom: 3rem;
  background-color: ${props => props.theme.dark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)'};
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px ${props => props.theme.dark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.1)'};
`;

const SectionTitle = styled.h2`
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  color: ${props => props.theme.dark ? 'var(--text-dark)' : 'var(--text-light)'};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 50px;
    height: 2px;
    background: linear-gradient(to right, var(--primary), var(--secondary));
  }
`;

const SectionContent = styled.div`
  line-height: 1.6;
  font-size: 1.1rem;
  color: ${props => props.theme.dark ? 'var(--text-dark)' : 'var(--text-light)'};
  
  p {
    margin-bottom: 1rem;
  }
  
  ul {
    margin: 1rem 0;
    padding-left: 1.5rem;
    
    li {
      margin-bottom: 0.5rem;
    }
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-top: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const CardContainer = styled(motion.div)`
  background-color: ${props => props.theme.dark ? 'rgba(255, 255, 255, 0.05)' : 'white'};
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const CardIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.dark ? 'var(--text-dark)' : 'var(--text-light)'};
`;

const CardDescription = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  color: ${props => props.theme.dark ? 'var(--text-dark)' : 'var(--text-light)'};
`;

const RainbowText = styled.span`
  background: linear-gradient(to right, var(--red), var(--orange), var(--yellow), var(--green), var(--blue), var(--indigo), var(--violet));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
`;

const AboutPage = () => {
  const { dark } = useTheme();
  
  const features = [
    {
      icon: '🧩',
      title: 'Juego Educativo',
      description: 'Rainbow Sorter combina el aprendizaje con la diversión, ayudando a comprender el orden de los colores en el arcoíris.'
    },
    {
      icon: '🎯',
      title: 'Objetivo Claro',
      description: 'Una mecánica sencilla pero efectiva: arrastra y suelta los colores para formar el arcoíris perfecto.'
    },
    {
      icon: '📱',
      title: 'Diseño Responsivo',
      description: 'Disfruta de la experiencia en cualquier dispositivo, ya sea móvil, tablet o escritorio.'
    },
    {
      icon: '🌈',
      title: 'Basado en la Ciencia',
      description: 'Aprende sobre el espectro visible de luz y el fenómeno natural del arcoíris mientras juegas.'
    }
  ];
  
  return (
    <PageContainer>
      <PageTitle
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Acerca de Rainbow Sorter
      </PageTitle>
      
      <Section theme={{ dark }}>
        <SectionTitle theme={{ dark }}>Nuestra Misión</SectionTitle>
        <SectionContent theme={{ dark }}>
          <p>
            <RainbowText>Rainbow Sorter</RainbowText> nació con una misión clara: hacer que el aprendizaje sobre los 
            colores y fenómenos naturales sea divertido e interactivo. Creemos que la mejor manera de aprender es 
            jugando, por lo que hemos diseñado una experiencia educativa que combina conocimientos científicos con 
            una mecánica de juego sencilla y adictiva.
          </p>
          <p>
            Destinado a personas de todas las edades, Rainbow Sorter es perfecto para:
          </p>
          <ul>
            <li>Niños que están aprendiendo sobre los colores del arcoíris</li>
            <li>Estudiantes que quieren reforzar sus conocimientos sobre física óptica</li>
            <li>Adultos que buscan un juego relajante con un componente educativo</li>
            <li>Educadores que necesitan herramientas interactivas para enseñar sobre la luz y los colores</li>
          </ul>
        </SectionContent>
      </Section>
      
      <Section theme={{ dark }}>
        <SectionTitle theme={{ dark }}>Características Principales</SectionTitle>
        <Grid>
          {features.map((feature, index) => (
            <CardContainer
              key={index}
              theme={{ dark }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <CardIcon>{feature.icon}</CardIcon>
              <CardTitle theme={{ dark }}>{feature.title}</CardTitle>
              <CardDescription theme={{ dark }}>{feature.description}</CardDescription>
            </CardContainer>
          ))}
        </Grid>
      </Section>
      
      <Section theme={{ dark }}>
        <SectionTitle theme={{ dark }}>Equipo</SectionTitle>
        <SectionContent theme={{ dark }}>
          <p>
            Rainbow Sorter es un proyecto creado con pasión por un equipo de desarrolladores, diseñadores y 
            educadores comprometidos con la creación de experiencias interactivas que combinen educación y entretenimiento.
          </p>
          <p>
            Si tienes alguna pregunta, sugerencia o comentario, no dudes en contactarnos a través de nuestra 
            sección de contacto o por correo electrónico a <strong>info@rainbowsorter.com</strong>.
          </p>
        </SectionContent>
      </Section>
    </PageContainer>
  );
};

export default AboutPage; 