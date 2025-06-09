import PropTypes from 'prop-types';
import { createContext, useContext, useReducer } from 'react';

import Modals from '@components/ui/modal/Modals';

const ModalContext = createContext([]);
const ModalDispatch = createContext(null);

function ModalProvider({ children }) {
  const [state, dispatch] = useReducer(modalReducer, []);

  return (
    <ModalContext.Provider value={state}>
      <ModalDispatch.Provider value={dispatch}>
        {children}
        <Modals />
      </ModalDispatch.Provider>
    </ModalContext.Provider>
  );
}

function modalReducer(state, action) {
  switch (action.type) {
    case 'open': {
      return [...state, { Component: action.Component, props: action.props }];
    }
    case 'close': {
      return state.filter((modal) => modal.Component !== action.Component);
    }
    case 'closeAll': {
      return [];
    }
    default: {
      throw new Error('Unknown action');
    }
  }
}

export function useModals() {
  return useContext(ModalContext);
}

export function useModalsDispatch() {
  return useContext(ModalDispatch);
}

export default ModalProvider;

ModalProvider.propTypes = {
  children: PropTypes.node,
};
