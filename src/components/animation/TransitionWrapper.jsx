import { useOutlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { useRouteStore } from '@store/routeStore.js';

const TransitionComponent = () => {
  const outlet = useOutlet();
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

      case 'null':
        return {
          initial: { opacity: 0 },
          animate: { opacity: [0, 1] },
          exit: { opacity: [1, 0] },
        };
    }
  };
  return (
    <AnimatePresence mode={'popLayout'}>
      <motion.main
        variants={variants()}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ type: 'spring', duration: 0.2 }}>
        {outlet}
      </motion.main>
    </AnimatePresence>
  );
};

export default TransitionComponent;
