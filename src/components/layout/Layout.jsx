import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import AnimatedBackground from '../common/AnimatedBackground';
import useReducedMotion from '../../hooks/useReducedMotion';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 1rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const Layout = ({ children }) => {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <LayoutContainer>
      <AnimatedBackground reducedMotion={prefersReducedMotion} />
      <Header />
      <MainContent>
        {children}
      </MainContent>
      <Footer />
    </LayoutContainer>
  );
};

export default Layout; 