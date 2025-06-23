import {
  ComponentType,
  createContext,
  Dispatch,
  PropsWithChildren,
  useContext,
  useReducer,
} from 'react';

import Modals from '@components/ui/modal/Modals';

type ModalItem<T> = {
  Component: ComponentType<T>;
  props: T;
};

type ModalAction<T> =
  | { type: 'open'; Component: ComponentType<T>; props: T }
  | { type: 'close'; Component: ComponentType<T> }
  | { type: 'closeAll' };

type ModalState = ModalItem<unknown>[];
type ModalDispatch = Dispatch<ModalAction<unknown>>;

const ModalContext = createContext<ModalState>([]);
const ModalDispatchContext = createContext<ModalDispatch | null>(null);

function modalReducer(state: ModalState, action: ModalAction<unknown>): ModalState {
  switch (action.type) {
    case 'open':
      return [...state, { Component: action.Component, props: action.props }];
    case 'close':
      return state.filter((modal) => modal.Component !== action.Component);
    case 'closeAll':
      return [];
    default:
      throw new Error('Unknown action');
  }
}

function ModalProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(modalReducer, []);

  return (
    <ModalContext.Provider value={state}>
      <ModalDispatchContext.Provider value={dispatch}>
        {children}
        <Modals />
      </ModalDispatchContext.Provider>
    </ModalContext.Provider>
  );
}

export default ModalProvider;

export function useModals() {

  return useContext(ModalContext);
}

export function useModalsDispatch() {
  return useContext(ModalDispatchContext);
}
