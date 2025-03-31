import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    /* Colores del arcoíris */
    --red: #FF0000;
    --orange: #FF7F00;
    --yellow: #FFFF00;
    --green: #00FF00;
    --blue: #0000FF;
    --indigo: #4B0082;
    --violet: #8B00FF;
    
    /* Colores base */
    --bg-light: #f5f5f5;
    --bg-dark: #121212;
    --text-light: #333333;
    --text-dark: #f5f5f5;
    --border-color: rgba(0, 0, 0, 0.1);
    
    /* Colores de tema con variaciones */
    --primary: #6200ea;
    --primary-light: #7c4dff;
    --primary-dark: #4a148c;
    --primary-rgb: 98, 0, 234;
    
    --secondary: #03dac6;
    --secondary-light: #84ffff;
    --secondary-dark: #00b0a1;
    --secondary-rgb: 3, 218, 198;
    
    --error: #b00020;
    --error-light: #ef5350;
    --error-dark: #8e0000;
    --error-rgb: 176, 0, 32;
    
    --success: #00c853;
    --success-light: #69f0ae;
    --success-dark: #009624;
    --success-rgb: 0, 200, 83;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Roboto', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: var(--bg-light);
    color: var(--text-light);
    transition: background-color 0.3s, color 0.3s;
  }

  body.dark-mode {
    background-color: var(--bg-dark);
    color: var(--text-dark);
    --border-color: rgba(255, 255, 255, 0.1);
  }

  button {
    cursor: pointer;
    border: none;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    font-weight: 500;
    transition: all 0.2s;
    
    &:hover {
      opacity: 0.9;
    }
    
    &:active {
      transform: scale(0.98);
    }
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul {
    list-style: none;
  }
  
  /* Utilidades */
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  /* Animaciones globales */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`;

export default GlobalStyles; 