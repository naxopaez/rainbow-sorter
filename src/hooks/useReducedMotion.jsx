import { useState, useEffect } from 'react';

// Hook para detectar si el usuario prefiere reducir el movimiento
const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Comprueba si el navegador soporta la media query
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // Establece el valor inicial
    setPrefersReducedMotion(mediaQuery.matches);
    
    // Función para manejar los cambios en la preferencia
    const handleChange = (event) => {
      setPrefersReducedMotion(event.matches);
    };
    
    // Añade el listener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Para compatibilidad con navegadores más antiguos
      mediaQuery.addListener(handleChange);
    }
    
    // Limpieza
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        // Para compatibilidad con navegadores más antiguos
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  return prefersReducedMotion;
};

export default useReducedMotion; 