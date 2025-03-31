import styled from 'styled-components';
import { motion } from 'framer-motion';

const StyledColorBlock = styled(motion.div)`
  width: 100%;
  height: ${props => {
    return props.$compact ? '38px' : '58px';
  }};
  background-color: ${props => `var(--${props.$color.toLowerCase()})`};
  border-radius: 8px;
  margin: ${props => props.$compact ? '1px' : '3px'} 0;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2), 
              inset 0 1px 2px rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${props => props.$isDraggable ? 'grab' : 'default'};
  position: relative;
  user-select: none;
  transition: transform 0.2s, box-shadow 0.2s;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0));
    border-radius: 8px 8px 0 0;
    pointer-events: none;
  }
  
  &:active {
    cursor: ${props => props.$isDraggable ? 'grabbing' : 'default'};
    transform: ${props => props.$isDraggable ? 'scale(1.02)' : 'none'};
    box-shadow: ${props => props.$isDraggable ? '0 4px 10px rgba(0, 0, 0, 0.25)' : '0 3px 6px rgba(0, 0, 0, 0.2)'};
  }
  
  &:hover {
    box-shadow: ${props => props.$isDraggable ? '0 4px 10px rgba(0, 0, 0, 0.2)' : '0 3px 6px rgba(0, 0, 0, 0.2)'};
    transform: ${props => props.$isDraggable ? 'translateY(-2px)' : 'none'};
  }
  
  ${props => props.$isCorrectPosition && `
    border: 3px solid var(--success);
    box-shadow: 0 0 10px var(--success), inset 0 1px 2px rgba(255, 255, 255, 0.5);
  `}
  
  ${props => props.$isIncorrectPosition && `
    border: 3px solid var(--error);
    box-shadow: 0 0 10px var(--error), inset 0 1px 2px rgba(255, 255, 255, 0.5);
  `}
  
  @media (min-width: 768px) {
    height: ${props => props.$compact ? '45px' : '65px'};
    width: 100%;
  }
`;

const ColorLabel = styled.span`
  color: #fff;
  font-weight: bold;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  font-size: ${props => props.$compact ? '0.85rem' : '1.1rem'};
  pointer-events: none;
  letter-spacing: 0.5px;
  
  @media (min-width: 768px) {
    font-size: ${props => props.$compact ? '0.95rem' : '1.3rem'};
  }
`;

const BlockNumber = styled.div`
  position: absolute;
  top: 4px;
  left: 4px;
  background-color: rgba(255, 255, 255, 0.9);
  color: #333;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: bold;
  pointer-events: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  
  @media (min-width: 768px) {
    width: 22px;
    height: 22px;
    font-size: 0.75rem;
  }
`;

const DragHint = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
  font-size: 0.7rem;
  background-color: rgba(255, 255, 255, 0.9);
  color: #333;
  padding: 1px 5px;
  border-radius: 4px;
  opacity: 0.9;
  display: ${props => props.$isDraggable ? 'block' : 'none'};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  pointer-events: none;
  
  @media (min-width: 768px) {
    padding: 2px 6px;
    font-size: 0.75rem;
  }
`;

const ColorBlock = ({ 
  color, 
  isDraggable = true, 
  isCorrectPosition = false,
  isIncorrectPosition = false,
  showLabel = true,
  compact = false,
  index,
  ...props 
}) => {
  return (
    <StyledColorBlock
      $color={color}
      $isDraggable={isDraggable}
      $isCorrectPosition={isCorrectPosition}
      $isIncorrectPosition={isIncorrectPosition}
      $compact={compact}
      whileHover={isDraggable ? { scale: 1.05 } : {}}
      whileTap={isDraggable ? { scale: 0.98 } : {}}
      {...props}
    >
      {showLabel && <ColorLabel $compact={compact}>{color}</ColorLabel>}
      {index !== undefined && <BlockNumber>{index + 1}</BlockNumber>}
      <DragHint $isDraggable={isDraggable}>⋮⋮</DragHint>
    </StyledColorBlock>
  );
};

export default ColorBlock; 