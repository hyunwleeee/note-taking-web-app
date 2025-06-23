import { useModalsDispatch } from '@contexts/modal.context';

export default function useModal() {
  const dispatch = useModalsDispatch();

  const openModal = (Component, props) => {
    dispatch({ type: 'open', Component, props });
  };

  const closeModal = (Component) => {
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
