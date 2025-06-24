import {
  ComponentType,
  createContext,
  Dispatch,
  PropsWithChildren,
  useContext,
  useReducer,
} from 'react';

type BaseModalProps = {
  onClose: () => void;
  onSubmit?: () => void;
};

type ModalItem = {
  Component: ComponentType<BaseModalProps>;
  props: BaseModalProps;
};

type ModalAction =
  | { type: 'open'; Component: ComponentType<BaseModalProps>; props: BaseModalProps }
  | { type: 'close'; Component: ComponentType<BaseModalProps> }
  | { type: 'closeAll' };

type ModalState = ModalItem[];
type ModalDispatch = Dispatch<ModalAction>;

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
      return state;
  }
}

export function ModalProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(modalReducer, []);

  return (
    <ModalContext.Provider value={state}>
      <ModalDispatchContext.Provider value={dispatch}>
        {children}
      </ModalDispatchContext.Provider>
    </ModalContext.Provider>
  );
}

export function useModals(): ModalState {
  return useContext(ModalContext);
}

export function useModalsDispatch(): ModalDispatch {
  const context = useContext(ModalDispatchContext);
  if (!context) throw new Error('useModalsDispatch must be used within ModalProvider');
  return context;
}

