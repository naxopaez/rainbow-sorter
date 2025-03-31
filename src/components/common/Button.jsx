import styled from 'styled-components';
import { motion } from 'framer-motion';

const ButtonVariants = {
  primary: {
    backgroundColor: 'var(--primary)',
    color: 'white'
  },
  secondary: {
    backgroundColor: 'var(--secondary)',
    color: 'var(--text-light)'
  },
  success: {
    backgroundColor: 'var(--success)',
    color: 'white'
  },
  error: {
    backgroundColor: 'var(--error)',
    color: 'white'
  },
  rainbow: {
    background: 'linear-gradient(to right, var(--red), var(--orange), var(--yellow), var(--green), var(--blue), var(--indigo), var(--violet))',
    color: 'white',
    textShadow: '1px 1px 1px rgba(0, 0, 0, 0.5)'
  }
};

const ButtonContainer = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.$size === 'large' ? '0.8rem 1.5rem' : props.$size === 'small' ? '0.4rem 0.8rem' : '0.6rem 1.2rem'};
  font-size: ${props => props.$size === 'large' ? '1rem' : props.$size === 'small' ? '0.8rem' : '0.9rem'};
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  position: relative;
  overflow: hidden;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: ${props => props.$fullWidth ? '100%' : 'auto'};
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(var(--primary-rgb), 0.5), 0 4px 15px rgba(0, 0, 0, 0.15);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0));
    pointer-events: none;
  }
  
  ${props => ButtonVariants[props.$variant]}
`;

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  fullWidth = false, 
  onClick, 
  disabled = false,
  type = 'button',
  ...props 
}) => {
  return (
    <ButtonContainer
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      onClick={onClick}
      disabled={disabled}
      type={type}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      {...props}
    >
      {children}
    </ButtonContainer>
  );
};

export default Button; 