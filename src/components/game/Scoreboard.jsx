import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const ScoreboardContainer = styled(motion.div)`
  background: ${props => props.theme.dark 
    ? 'linear-gradient(to bottom, rgba(30, 30, 30, 0.85), rgba(15, 15, 15, 0.9))'
    : 'linear-gradient(to bottom, rgba(255, 255, 255, 0.85), rgba(240, 240, 240, 0.9))'
  };
  border-radius: 12px;
  padding: ${props => props.$compact ? '0.6rem' : '1rem'};
  margin: ${props => props.$compact ? '0.6rem 0' : '1rem 0'};
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid ${props => props.theme.dark 
    ? 'rgba(255, 255, 255, 0.1)' 
    : 'rgba(0, 0, 0, 0.05)'
  };
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: ${props => props.$compact ? '40px' : '50px'};
    background: linear-gradient(to right,
      rgba(255, 0, 0, 0.1),
      rgba(255, 127, 0, 0.1),
      rgba(255, 255, 0, 0.1),
      rgba(0, 255, 0, 0.1),
      rgba(0, 0, 255, 0.1),
      rgba(75, 0, 130, 0.1),
      rgba(139, 0, 255, 0.1)
    );
    opacity: 0.5;
    z-index: 0;
    border-radius: 12px 12px 0 0;
  }
`;

const Title = styled.h2`
  font-size: ${props => props.$compact ? '1rem' : '1.2rem'};
  margin-bottom: ${props => props.$compact ? '0.5rem' : '0.7rem'};
  position: relative;
  color: ${props => props.theme.dark ? 'var(--text-dark)' : 'var(--text-light)'};
  text-align: center;
  font-weight: bold;
  
  &::after {
    content: '';
    display: block;
    width: ${props => props.$compact ? '40px' : '50px'};
    height: ${props => props.$compact ? '2px' : '2px'};
    background: linear-gradient(to right, var(--primary), var(--secondary));
    margin: 0.3rem auto 0;
    border-radius: 3px;
  }
`;

const ScoresList = styled.ul`
  list-style: none;
  margin-top: ${props => props.$compact ? '0.5rem' : '0.7rem'};
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.$compact ? '3px' : '5px'};
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${props => props.$compact ? '5px' : '8px'};
  }
`;

const ScoreItem = styled(motion.li)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.$compact ? '0.3rem 0.6rem' : '0.5rem 0.8rem'};
  margin-bottom: 0;
  background-color: ${props => props.theme.dark
    ? 'rgba(40, 40, 40, 0.6)'
    : 'rgba(250, 250, 250, 0.6)'
  };
  border-radius: 8px;
  border-left: 4px solid ${props => {
    if (props.$position === 0) return 'var(--success)';
    if (props.$position === 1) return 'var(--primary)';
    if (props.$position === 2) return 'var(--secondary)';
    return 'var(--border-color)';
  }};
  
  ${props => props.$isHighlighted && `
    background-color: ${props.theme.dark
      ? 'rgba(var(--primary-rgb), 0.2)'
      : 'rgba(var(--primary-rgb), 0.1)'
    };
    transform: scale(1.02);
    box-shadow: 0 4px 12px rgba(var(--primary-rgb), 0.2);
  `}
`;

const PlayerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.$compact ? '0.3rem' : '0.5rem'};
`;

const Position = styled.span`
  font-weight: bold;
  font-size: ${props => props.$compact ? '0.8rem' : '0.9rem'};
  width: ${props => props.$compact ? '18px' : '20px'};
  height: ${props => props.$compact ? '18px' : '20px'};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${props => {
    if (props.$position === 0) return 'var(--success)';
    if (props.$position === 1) return 'var(--primary)';
    if (props.$position === 2) return 'var(--secondary)';
    return 'var(--border-color)';
  }};
  color: white;
`;

const PlayerName = styled.span`
  font-weight: ${props => props.$isHighlighted ? 'bold' : 'normal'};
  font-size: ${props => props.$compact ? '0.8rem' : '0.9rem'};
`;

const ScoreValue = styled.span`
  font-weight: bold;
  font-size: ${props => props.$compact ? '0.8rem' : '0.9rem'};
  background: ${props => props.$position < 3 
    ? 'linear-gradient(135deg, var(--primary), var(--secondary))'
    : 'none'
  };
  color: ${props => props.$position < 3 
    ? 'white' 
    : props.theme.dark ? 'var(--text-dark)' : 'var(--text-light)'
  };
  padding: ${props => props.$position < 3 
    ? (props.$compact ? '0.1rem 0.4rem' : '0.2rem 0.5rem') 
    : '0'
  };
  border-radius: ${props => props.$position < 3 ? '20px' : '0'};
  min-width: ${props => props.$position < 3 ? (props.$compact ? '40px' : '45px') : 'auto'};
  text-align: center;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${props => props.$compact ? '0.7rem' : '1rem'};
  color: ${props => props.theme.dark ? 'var(--text-dark)' : 'var(--text-light)'};
  font-style: italic;
  opacity: 0.7;
  font-size: ${props => props.$compact ? '0.8rem' : '0.9rem'};
`;

const Scoreboard = ({ scores = [], currentPlayer, title = "Tabla de Puntuaciones", compact = false }) => {
  const { dark } = useTheme();
  
  // Ordenar puntuaciones de mayor a menor
  const sortedScores = [...scores].sort((a, b) => b.score - a.score);
  
  return (
    <ScoreboardContainer 
      theme={{ dark }}
      $compact={compact}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Title theme={{ dark }} $compact={compact}>{title}</Title>
      
      {sortedScores.length > 0 ? (
        <ScoresList $compact={compact}>
          {sortedScores.map((scoreItem, index) => {
            const isCurrentPlayer = currentPlayer && scoreItem.playerId === currentPlayer;
            
            return (
              <ScoreItem 
                key={`${scoreItem.playerId}-${index}`}
                theme={{ dark }}
                $position={index}
                $isHighlighted={isCurrentPlayer}
                $compact={compact}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <PlayerInfo $compact={compact}>
                  <Position $position={index} $compact={compact}>{index + 1}</Position>
                  <PlayerName $isHighlighted={isCurrentPlayer} $compact={compact}>
                    {scoreItem.playerName}
                    {isCurrentPlayer && " (Tú)"}
                  </PlayerName>
                </PlayerInfo>
                <ScoreValue 
                  $position={index}
                  $compact={compact}
                  theme={{ dark }}
                >
                  {scoreItem.score} pts
                </ScoreValue>
              </ScoreItem>
            );
          })}
        </ScoresList>
      ) : (
        <EmptyState theme={{ dark }} $compact={compact}>
          No hay puntuaciones registradas todavía
        </EmptyState>
      )}
    </ScoreboardContainer>
  );
};

export default Scoreboard; 