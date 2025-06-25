import {
  ComponentType,
  createContext,
  Dispatch,
  PropsWithChildren,
  useContext,
  useReducer,
} from 'react';
import { ModalProps } from '@type/modal';

type ModalItem = {
  Component: ComponentType<ModalProps>;
  props: ModalProps;
};

export type ModalAction =
  | { type: 'open'; Component: ComponentType<ModalProps>; props: ModalProps }
  | { type: 'close'; Component: ComponentType<ModalProps> }
  | { type: 'closeAll' };

export type ModalState = ModalItem[];
export type ModalDispatch = Dispatch<ModalAction>;

const ModalContext = createContext<ModalState>([]);
const ModalDispatchContext = createContext<ModalDispatch | null>(null);

function modalReducer(state: ModalState, action: ModalAction): ModalState {
  switch (action.type) {
    case 'open':
      return [...state, { Component: action.Component, props: action.props }];
    case 'close':
      return state.filter((modal) => modal.Component !== action.Component);
    case 'closeAll':
      return [];
    default:
      throw new Error('Unknown modal action');
  }
}

const ModalProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(modalReducer, []);
  return (
    <ModalContext.Provider value={state}>
      <ModalDispatchContext.Provider value={dispatch}>
        {children}
      </ModalDispatchContext.Provider>
    </ModalContext.Provider>
  );
};

const useModals = () => useContext(ModalContext);
const useModalsDispatch = () => {
  const context = useContext(ModalDispatchContext);
  if (!context) throw new Error('useModalsDispatch must be used within ModalProvider');
  return context;
};

export { ModalProvider, useModals, useModalsDispatch };

