import { useModals, useModalsDispatch } from '@contexts/modal.context';
import { Suspense } from 'react';

const Modals = () => {
  const openedModals = useModals();
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
