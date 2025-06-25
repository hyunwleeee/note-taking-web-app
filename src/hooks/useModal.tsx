import { useModalsDispatch } from '@contexts/modal.context';
import { ModalProps } from '@type/modal';
import { ComponentType } from 'react';

export default function useModal() {
  const dispatch = useModalsDispatch();

  const openModal = (Component: ComponentType<ModalProps>, props: ModalProps) => {
    dispatch({ type: 'open', Component, props });
  };

  const closeModal = (Component: ComponentType<ModalProps>) => {
    dispatch({ type: 'close', Component });
  };

  const closeAllModal = () => {
    dispatch({ type: 'closeAll' });
  };

  return {
    openModal,
    closeModal,
    closeAllModal,
  };
}

