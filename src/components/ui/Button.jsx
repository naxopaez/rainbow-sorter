import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

const ButtonContainer = styled(motion.button)`
  padding: 12px 24px;
  border-radius: 10px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  position: relative;
  overflow: hidden;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  
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
  
  ${props => props.$variant === 'primary' && css`
    background: linear-gradient(135deg, var(--primary), var(--primary-dark));
    color: white;
    
    &:hover:not(:disabled) {
      background: linear-gradient(135deg, var(--primary-light), var(--primary));
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(var(--primary-rgb), 0.4);
    }
    
    &:active:not(:disabled) {
      transform: translateY(1px);
      box-shadow: 0 2px 10px rgba(var(--primary-rgb), 0.4);
    }
  `}
  
  ${props => props.$variant === 'secondary' && css`
    background: linear-gradient(135deg, var(--secondary), var(--secondary-dark));
    color: white;
    
    &:hover:not(:disabled) {
      background: linear-gradient(135deg, var(--secondary-light), var(--secondary));
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(var(--secondary-rgb), 0.4);
    }
    
    &:active:not(:disabled) {
      transform: translateY(1px);
      box-shadow: 0 2px 10px rgba(var(--secondary-rgb), 0.4);
    }
  `}
  
  ${props => props.$variant === 'success' && css`
    background: linear-gradient(135deg, var(--success), var(--success-dark));
    color: white;
    
    &:hover:not(:disabled) {
      background: linear-gradient(135deg, var(--success-light), var(--success));
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(var(--success-rgb), 0.4);
    }
    
    &:active:not(:disabled) {
      transform: translateY(1px);
      box-shadow: 0 2px 10px rgba(var(--success-rgb), 0.4);
    }
  `}
  
  ${props => props.$variant === 'error' && css`
    background: linear-gradient(135deg, var(--error), var(--error-dark));
    color: white;
    
    &:hover:not(:disabled) {
      background: linear-gradient(135deg, var(--error-light), var(--error));
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(var(--error-rgb), 0.4);
    }
    
    &:active:not(:disabled) {
      transform: translateY(1px);
      box-shadow: 0 2px 10px rgba(var(--error-rgb), 0.4);
    }
  `}
  
  ${props => props.$variant === 'outline' && css`
    background: transparent;
    color: var(--text-color);
    border: 2px solid var(--border-color);
    
    &:hover:not(:disabled) {
      background: rgba(var(--primary-rgb), 0.05);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
    }
    
    &:active:not(:disabled) {
      transform: translateY(1px);
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
  `}
  
  ${props => props.$size === 'small' && css`
    padding: 8px 16px;
    font-size: 0.875rem;
  `}
  
  ${props => props.$size === 'large' && css`
    padding: 14px 30px;
    font-size: 1.125rem;
  `}
  
  ${props => props.$fullWidth && css`
    width: 100%;
  `}
`;

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'button',
  ...props 
}) => {
  return (
    <ButtonContainer
      as={motion.button}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...props}
    >
      {children}
    </ButtonContainer>
  );
};

export default Button; 