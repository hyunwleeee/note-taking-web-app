import { useRouteStore } from '@store/routeStore';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';
import styled from 'styled-components';

const TransitionWrapper = ({ children }: { children: ReactNode }) => {
  const { slideDirection } = useRouteStore();

  const variants = () => {
    switch (slideDirection) {
      case 'slide-next':
        return {
          initial: { left: '80%' },
          animate: { left: ['80%', '0%'] },
          exit: { left: ['0%', '-100%'] },
        };
      case 'slide-prev':
        return {
          initial: { left: '-80%' },
          animate: { left: ['-80%', '0%'] },
          exit: { left: ['0%', '100%'] },
        };
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: [0, 1] },
          exit: { opacity: [1, 0] },
        };
    }
  };

  return (
    <AnimatePresence key={location.pathname}>
      <MainContainer
        variants={variants()}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ type: 'tween', duration: 0.3 }}
      >
        {children}
      </MainContainer>
    </AnimatePresence>
  );
};

const MainContainer = styled(motion.main)`
  position: relative;
  width: 100%;
`;

export default TransitionWrapper;
