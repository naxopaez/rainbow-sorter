import styled from 'styled-components';
import { motion } from 'framer-motion';
import Button from '../common/Button';

const ResultContainer = styled(motion.div)`
  text-align: center;
  padding: 1rem;
  margin-top: 0.5rem;
`;

const Title = styled.h2`
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  color: ${props => props.success 
    ? 'var(--success)' 
    : 'var(--error)'
  };
`;

const Message = styled.p`
  margin-bottom: 1rem;
  font-size: 1rem;
  line-height: 1.3;
`;

const Confetti = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 100;
`;

const ConfettiPiece = styled(motion.div)`
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: ${props => props.color};
  border-radius: ${props => props.round ? '50%' : '0'};
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin-top: 0.5rem;
`;

const confettiVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

// Genera confeti de colores aleatoriamente
const generateConfetti = () => {
  const confetti = [];
  const colors = ['var(--red)', 'var(--orange)', 'var(--yellow)', 'var(--green)', 'var(--blue)', 'var(--indigo)', 'var(--violet)'];
  
  for (let i = 0; i < 100; i++) {
    const color = colors[Math.floor(Math.random() * colors.length)];
    const x = Math.random() * 100;
    const y = -10 - Math.random() * 100;
    const size = 5 + Math.random() * 15;
    const round = Math.random() > 0.5;
    
    confetti.push(
      <ConfettiPiece
        key={i}
        color={color}
        round={round}
        style={{ 
          left: `${x}%`, 
          top: `${y}px`,
          width: `${size}px`,
          height: `${size}px`
        }}
        animate={{
          y: ['0vh', '100vh'],
          x: [null, x - 10 + Math.random() * 20 + '%'],
          rotate: [0, Math.random() * 360]
        }}
        transition={{
          duration: 4 + Math.random() * 3,
          ease: 'easeOut',
          delay: Math.random() * 2
        }}
      />
    );
  }
  
  return confetti;
};

const GameResult = ({ 
  success, 
  onPlayAgain, 
  onNextLevel, 
  canContinue = false 
}) => {
  return (
    <ResultContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Title success={success}>
        {success ? '¡Excelente!' : 'Casi lo logras...'}
      </Title>
      
      <Message>
        {success 
          ? '¡Has ordenado correctamente los colores del arcoíris!' 
          : 'El orden no es correcto. Intenta nuevamente.'}
      </Message>
      
      <ButtonsContainer>
        <Button 
          onClick={onPlayAgain}
          variant={success ? 'secondary' : 'primary'}
        >
          {success ? 'Jugar otra vez' : 'Intentar nuevamente'}
        </Button>
        
        {success && canContinue && (
          <Button 
            onClick={onNextLevel} 
            variant="rainbow"
          >
            Siguiente nivel
          </Button>
        )}
      </ButtonsContainer>
      
      {success && (
        <Confetti
          variants={confettiVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {generateConfetti()}
        </Confetti>
      )}
    </ResultContainer>
  );
};

export default GameResult; 