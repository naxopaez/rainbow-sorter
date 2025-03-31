import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import DraggableColorList from '../components/game/DraggableColorList';
import Button from '../components/common/Button';
import GameResult from '../components/game/GameResult';
import Modal from '../components/common/Modal';
import RainbowGradientBackground from '../components/common/RainbowGradientBackground';
import useReducedMotion from '../hooks/useReducedMotion';
import { useTheme } from '../contexts/ThemeContext';

const PageContainer = styled.div`
  padding: 0.3rem 0;
  position: relative;
`;

const PageTitle = styled(motion.h1)`
  text-align: center;
  margin-bottom: 0.3rem;
  font-size: 1.8rem;
  text-shadow: ${props => props.theme.dark ? '0 2px 4px rgba(0, 0, 0, 0.3)' : '0 2px 4px rgba(255, 255, 255, 0.5)'};
`;

const GameSection = styled.section`
  max-width: 600px;
  margin: 0 auto;
  padding: 0.5rem;
  background-color: ${props => props.theme.dark 
    ? 'rgba(18, 18, 18, 0.85)' 
    : 'rgba(255, 255, 255, 0.85)'
  };
  border-radius: 12px;
  box-shadow: 0 8px 16px ${props => props.theme.dark ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.15)'};
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(5px);
`;

const GameControls = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.3rem;
  margin-top: 0.4rem;
  margin-bottom: 0.4rem;
  flex-wrap: wrap;
  position: relative;
  z-index: 2;
`;

const LevelIndicator = styled.div`
  text-align: center;
  margin-bottom: 0.2rem;
  font-size: 1rem;
  color: ${props => props.theme.dark ? 'var(--text-dark)' : 'var(--text-light)'};
  position: relative;
  z-index: 2;
  font-weight: bold;
`;

const InstructionsText = styled.p`
  text-align: center;
  margin-bottom: 0.3rem;
  line-height: 1.3;
  color: ${props => props.theme.dark ? 'var(--text-dark)' : 'var(--text-light)'};
  position: relative;
  z-index: 2;
  font-size: 0.85rem;
`;

const ModalContent = styled.div`
  text-align: center;
  
  h2 {
    margin-bottom: 1.5rem;
    color: ${props => props.theme.dark ? 'var(--text-dark)' : 'var(--text-light)'};
  }
  
  p {
    margin-bottom: 1rem;
    line-height: 1.6;
    color: ${props => props.theme.dark ? 'var(--text-dark)' : 'var(--text-light)'};
  }
  
  ul {
    text-align: left;
    margin: 1.5rem 0;
    padding-left: 1.5rem;
    
    li {
      margin-bottom: 0.8rem;
      color: ${props => props.theme.dark ? 'var(--text-dark)' : 'var(--text-light)'};
    }
  }
`;

const DragInstructions = styled.div`
  padding: 0.2rem;
  margin-bottom: 0.3rem;
  text-align: center;
  font-size: 0.8rem;
  color: ${props => props.theme.dark ? 'var(--text-dark)' : 'var(--text-light)'};
  position: relative;
  z-index: 2;
  font-weight: 500;
`;

// Función para mezclar un array (algoritmo Fisher-Yates)
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const PlayPage = () => {
  const { dark } = useTheme();
  const prefersReducedMotion = useReducedMotion();
  const [colors, setColors] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [gameChecked, setGameChecked] = useState(false);
  const [isGameCorrect, setIsGameCorrect] = useState(false);
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const maxLevel = 5; // Definimos el nivel máximo
  
  const correctOrder = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Indigo', 'Violet'];
  
  // Inicializar el nivel cuando cambia currentLevel o al inicio
  useEffect(() => {
    resetLevel();
  }, [currentLevel]);
  
  // Randomizar los colores para un nuevo nivel
  const resetLevel = () => {
    // Asegurarse de que los colores estén bien mezclados
    const newColors = shuffleArray(correctOrder);
    
    // Validar que el orden no sea igual al correcto por casualidad
    const isCorrect = newColors.every((color, index) => color === correctOrder[index]);
    if (isCorrect) {
      // Si por casualidad quedaron ordenados, mezclar de nuevo
      resetLevel();
      return;
    }
    
    console.log('Nuevo orden de colores:', newColors);
    setColors(newColors);
    setGameChecked(false);
    setIsGameCorrect(false);
    setShowFeedback(false);
  };
  
  const handleColorsChange = (newColors) => {
    console.log('Colores cambiados a:', newColors);
    setColors(newColors);
  };
  
  const handleCheckOrder = () => {
    const isCorrect = colors.every((color, index) => color === correctOrder[index]);
    console.log('¿Orden correcto?', isCorrect);
    setIsGameCorrect(isCorrect);
    setGameChecked(true);
    setShowFeedback(true);
  };
  
  const handlePlayAgain = () => {
    resetLevel();
  };
  
  const handleNextLevel = () => {
    setCurrentLevel(prev => prev + 1);
  };
  
  return (
    <PageContainer>
      <PageTitle
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Ordena el Arcoíris
      </PageTitle>
      
      <GameSection theme={{ dark }}>
        <RainbowGradientBackground reducedMotion={prefersReducedMotion} />
        
        <LevelIndicator theme={{ dark }}>
          Nivel {currentLevel}
        </LevelIndicator>
        
        <InstructionsText theme={{ dark }}>
          Arrastra los colores y colócalos en el orden correcto del arcoíris
        </InstructionsText>
        
        <DragInstructions theme={{ dark }}>
          💡 Consejo: Haz clic y arrastra cada color para reordenarlos
        </DragInstructions>
        
        <DraggableColorList 
          colors={colors}
          onColorsChange={handleColorsChange}
          theme={{ dark }}
          showFeedback={showFeedback}
        />
        
        {!gameChecked ? (
          <GameControls>
            <Button 
              onClick={handleCheckOrder}
              variant="primary"
            >
              Comprobar orden
            </Button>
            
            <Button 
              onClick={() => setShowInstructionsModal(true)}
              variant="secondary"
            >
              Instrucciones
            </Button>
            
            <Button 
              onClick={resetLevel}
              variant="outline"
            >
              Reiniciar
            </Button>
          </GameControls>
        ) : (
          <GameResult 
            success={isGameCorrect}
            onPlayAgain={handlePlayAgain}
            onNextLevel={handleNextLevel}
            canContinue={currentLevel < maxLevel}
          />
        )}
      </GameSection>
      
      {/* Modal de instrucciones */}
      <Modal
        isOpen={showInstructionsModal}
        onClose={() => setShowInstructionsModal(false)}
        title="Instrucciones del juego"
      >
        <ModalContent theme={{ dark }}>
          <p>
            El objetivo de este juego es ordenar los colores del arcoíris en su secuencia correcta.
          </p>
          
          <ul>
            <li>Arrastra y suelta los bloques de colores para reordenarlos.</li>
            <li>Una vez que creas tener el orden correcto, presiona "Comprobar orden".</li>
            <li>Si el orden es correcto, podrás avanzar al siguiente nivel.</li>
            <li>Si no es correcto, puedes intentarlo nuevamente.</li>
          </ul>
          
          <p>
            El orden correcto del arcoíris es: <strong>Rojo, Naranja, Amarillo, Verde, Azul, Índigo y Violeta</strong>.
          </p>
        </ModalContent>
      </Modal>
    </PageContainer>
  );
};

export default PlayPage; 