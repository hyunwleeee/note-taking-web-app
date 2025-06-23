import { useModals, useModalsDispatch } from '@contexts/modal.context';
import { Suspense } from 'react';

type ModalComponentProps = {
  onClose: () => void;
  onSubmit?: () => void;
  [key: string]: any;
};

type ModalItem = {
  Component: React.ComponentType<ModalComponentProps>;
  props: Omit<ModalComponentProps, 'onClose'>;
};

const Modals = () => {
  const openedModals = useModals() as ModalItem[];
  const dispatch = useModalsDispatch();

  return openedModals.map((modal, index) => {
    const { Component, props } = modal;
    const { onSubmit, ...restProps } = props;

    const onClose = () => {
      dispatch({ type: 'close', Component });
    };

    return (
      <Suspense fallback={<></>} key={index}>
        <Component key={index} onClose={onClose} onSubmit={onSubmit} {...restProps} />
      </Suspense>
    );
  });
};


export default Modals;
