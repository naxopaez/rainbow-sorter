import { useState, useEffect } from 'react';
import styled from 'styled-components';
import ColorBlock from './ColorBlock';

const Container = styled.div`
  padding: 0.3rem;
  max-width: 500px;
  margin: 0 auto;
`;

const Instructions = styled.div`
  text-align: center;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: ${props => props.theme.dark ? 'var(--text-dark)' : 'var(--text-light)'};
`;

// Estilo para el contenedor draggable
const ColorBlockContainer = styled.div`
  margin-bottom: 1px;
  transition: transform 0.2s;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ColorsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2px;
  padding-bottom: 0;
  justify-content: center;
  max-height: none;
  overflow-y: visible;
  
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${props => props.theme.dark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.dark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.2)'};
    border-radius: 10px;
  }
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr;
    gap: 3px;
    max-height: none;
    overflow-y: visible;
  }
`;

const DraggableColorList = ({ 
  colors, 
  onColorsChange, 
  onCheck, 
  showFeedback = false,
  theme = { dark: false },
  correctOrder = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Indigo', 'Violet']
}) => {
  const [colorList, setColorList] = useState(colors);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dropTarget, setDropTarget] = useState(null);
  
  useEffect(() => {
    setColorList(colors);
  }, [colors]);
  
  // Función para manejar el inicio del arrastre
  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };
  
  // Función para manejar el final del arrastre
  const handleDragEnd = () => {
    if (draggedIndex !== null && dropTarget !== null && draggedIndex !== dropTarget) {
      // Crear una copia del array
      const newList = [...colorList];
      
      // Obtener el elemento arrastrado
      const draggedItem = newList[draggedIndex];
      
      // Eliminar de la posición original
      newList.splice(draggedIndex, 1);
      
      // Insertar en la nueva posición
      newList.splice(dropTarget, 0, draggedItem);
      
      // Actualizar el estado
      setColorList(newList);
      onColorsChange(newList);
      
      // Verificar si el orden es correcto
      if (onCheck) {
        const isCorrect = checkCorrectOrder(newList);
        onCheck(isCorrect);
      }
    }
    
    // Reiniciar índices
    setDraggedIndex(null);
    setDropTarget(null);
  };
  
  // Función para manejar cuando se arrastra sobre un elemento
  const handleDragOver = (index) => {
    if (draggedIndex !== null && index !== dropTarget) {
      setDropTarget(index);
    }
  };
  
  const checkCorrectOrder = (list) => {
    return list.every((color, index) => color === correctOrder[index]);
  };
  
  const isPositionCorrect = (color, index) => {
    return correctOrder[index] === color;
  };

  // Asegurarse de que colorList es un array antes de mapear
  if (!Array.isArray(colorList) || colorList.length === 0) {
    return <div>Cargando colores...</div>;
  }

  return (
    <Container>
      <Instructions theme={theme}>
        Ordena los colores para formar un arcoíris
      </Instructions>
      
      <ColorsGrid theme={theme}>
        {colorList.map((color, index) => (
          <ColorBlockContainer
            key={color}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => {
              e.preventDefault(); // Necesario para permitir el drop
              handleDragOver(index);
            }}
            onDragEnter={(e) => {
              e.preventDefault();
              handleDragOver(index);
            }}
            onDrop={(e) => {
              e.preventDefault();
              handleDragEnd();
            }}
          >
            <ColorBlock
              color={color}
              isDraggable={true}
              isCorrectPosition={showFeedback && isPositionCorrect(color, index)}
              isIncorrectPosition={showFeedback && !isPositionCorrect(color, index)}
              index={index}
              compact={true}
            />
          </ColorBlockContainer>
        ))}
      </ColorsGrid>
    </Container>
  );
};

export default DraggableColorList; 