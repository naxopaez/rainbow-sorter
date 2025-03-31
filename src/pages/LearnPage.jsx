import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Button from '../components/common/Button';
import ColorBlock from '../components/game/ColorBlock';
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
  
  ul, ol {
    margin: 1rem 0;
    padding-left: 1.5rem;
    
    li {
      margin-bottom: 0.5rem;
    }
  }
  
  img {
    max-width: 100%;
    border-radius: 8px;
    margin: 1.5rem 0;
  }
`;

const Rainbow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 600px;
  margin: 2rem auto;
`;

const TabContainer = styled.div`
  margin-bottom: 2rem;
`;

const TabButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

const TabButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: ${props => props.active 
    ? props.theme.dark ? 'var(--primary)' : 'var(--primary)' 
    : props.theme.dark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
  };
  color: ${props => props.active ? 'white' : props.theme.dark ? 'var(--text-dark)' : 'var(--text-light)'};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  transition: all 0.3s;
  
  &:hover {
    background-color: ${props => !props.active && (props.theme.dark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)')};
  }
`;

const TabContent = styled(motion.div)`
  background-color: ${props => props.theme.dark ? 'rgba(255, 255, 255, 0.05)' : 'white'};
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const LearnPage = () => {
  const { dark } = useTheme();
  const [activeTab, setActiveTab] = useState('science');
  
  const rainbowColors = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Indigo', 'Violet'];
  
  const tabs = [
    {
      id: 'science',
      label: 'Ciencia del Arcoíris',
      content: (
        <>
          <p>
            Un arcoíris es un fenómeno meteorológico y óptico que causa la aparición de un espectro de luz en el cielo, 
            tomando la forma de un arco multicolor. Los arcoíris son causados por la refracción, reflexión y dispersión 
            de la luz en gotas de agua, lo que resulta en un espectro de luz que aparece en el cielo.
          </p>
          <p>
            Cuando la luz blanca del sol pasa a través de gotas de lluvia, se dobla (refracta) y se separa en sus colores componentes. 
            Cada color de luz tiene una longitud de onda diferente y se dobla en un ángulo ligeramente distinto.
          </p>
          <ul>
            <li><strong>Rojo</strong>: La longitud de onda más larga (620-750 nm)</li>
            <li><strong>Naranja</strong>: (590-620 nm)</li>
            <li><strong>Amarillo</strong>: (570-590 nm)</li>
            <li><strong>Verde</strong>: (495-570 nm)</li>
            <li><strong>Azul</strong>: (450-495 nm)</li>
            <li><strong>Índigo</strong>: (420-450 nm)</li>
            <li><strong>Violeta</strong>: La longitud de onda más corta (380-420 nm)</li>
          </ul>
          <p>
            El físico Isaac Newton identificó los siete colores del arcoíris en el siglo XVII, 
            y utilizó el acrónimo "ROYGBIV" (Red, Orange, Yellow, Green, Blue, Indigo, Violet) para recordarlos.
          </p>
        </>
      )
    },
    {
      id: 'history',
      label: 'Historia y Cultura',
      content: (
        <>
          <p>
            A lo largo de la historia, los arcoíris han sido símbolos importantes en muchas culturas y religiones.
          </p>
          <ul>
            <li>
              <strong>Mitología nórdica</strong>: El Bifröst era un puente arcoíris que conectaba Midgard (la Tierra) 
              con Asgard (el reino de los dioses).
            </li>
            <li>
              <strong>Mitología griega</strong>: Iris era la diosa del arcoíris y mensajera de los dioses.
            </li>
            <li>
              <strong>Judaísmo y Cristianismo</strong>: En el relato del diluvio, Dios envía un arcoíris como símbolo 
              de su promesa de no volver a destruir la Tierra con agua.
            </li>
            <li>
              <strong>Cultura irlandesa</strong>: Según la leyenda, los leprechauns esconden su oro al final del arcoíris.
            </li>
            <li>
              <strong>Cultura moderna</strong>: El arcoíris es un símbolo de diversidad, inclusión y esperanza.
            </li>
          </ul>
        </>
      )
    },
    {
      id: 'colors',
      label: 'Significado de Colores',
      content: (
        <>
          <p>
            Cada color del arcoíris tiene significados culturales y psicológicos:
          </p>
          <ul>
            <li>
              <strong style={{color: 'var(--red)'}}>Rojo</strong>: Representa la pasión, el amor, la energía y la fuerza. 
              Es un color estimulante y vibrante.
            </li>
            <li>
              <strong style={{color: 'var(--orange)'}}>Naranja</strong>: Simboliza la creatividad, el entusiasmo y la vitalidad. 
              Es un color cálido y acogedor.
            </li>
            <li>
              <strong style={{color: 'var(--yellow)'}}>Amarillo</strong>: Asociado con la alegría, la felicidad y el optimismo. 
              Representa la luz del sol y la energía positiva.
            </li>
            <li>
              <strong style={{color: 'var(--green)'}}>Verde</strong>: Simboliza la naturaleza, el crecimiento, la armonía y la fertilidad. 
              Es un color relajante y equilibrado.
            </li>
            <li>
              <strong style={{color: 'var(--blue)'}}>Azul</strong>: Representa la tranquilidad, la serenidad y la confianza. 
              Es un color relajante asociado con el cielo y el mar.
            </li>
            <li>
              <strong style={{color: 'var(--indigo)'}}>Índigo</strong>: Simboliza la intuición, la percepción y la espiritualidad. 
              Es un color profundo y místico.
            </li>
            <li>
              <strong style={{color: 'var(--violet)'}}>Violeta</strong>: Asociado con la imaginación, la sabiduría y la transformación. 
              Representa la realeza y el lujo.
            </li>
          </ul>
        </>
      )
    }
  ];
  
  return (
    <PageContainer>
      <PageTitle
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Aprende sobre Arcoíris
      </PageTitle>
      
      <Section theme={{ dark }}>
        <SectionTitle theme={{ dark }}>El Orden del Arcoíris</SectionTitle>
        <SectionContent theme={{ dark }}>
          <p>
            El arcoíris contiene siete colores principales, que se organizan siempre en el mismo orden. 
            Este orden no es arbitrario: sigue el espectro electromagnético visible, ordenado por longitud de onda.
          </p>
          
          <Rainbow>
            {rainbowColors.map((color, index) => (
              <ColorBlock 
                key={color} 
                color={color} 
                isDraggable={false}
                index={index}
              />
            ))}
          </Rainbow>
          
          <p>
            Una forma común de recordar el orden es mediante el acrónimo <strong>ROYGBIV</strong> (en inglés): 
            <strong>R</strong>ed (Rojo), <strong>O</strong>range (Naranja), <strong>Y</strong>ellow (Amarillo), 
            <strong>G</strong>reen (Verde), <strong>B</strong>lue (Azul), <strong>I</strong>ndigo (Índigo), 
            <strong>V</strong>iolet (Violeta).
          </p>
        </SectionContent>
      </Section>
      
      <Section theme={{ dark }}>
        <SectionTitle theme={{ dark }}>Todo sobre Arcoíris</SectionTitle>
        <TabContainer>
          <TabButtons>
            {tabs.map(tab => (
              <TabButton 
                key={tab.id}
                active={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                theme={{ dark }}
              >
                {tab.label}
              </TabButton>
            ))}
          </TabButtons>
          
          <TabContent
            theme={{ dark }}
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <SectionContent theme={{ dark }}>
              {tabs.find(tab => tab.id === activeTab).content}
            </SectionContent>
          </TabContent>
        </TabContainer>
        
        <Button
          as="a"
          href="https://es.wikipedia.org/wiki/Arco%C3%ADris"
          target="_blank"
          rel="noopener noreferrer"
          variant="secondary"
        >
          Aprender más en Wikipedia
        </Button>
      </Section>
    </PageContainer>
  );
};

export default LearnPage; 