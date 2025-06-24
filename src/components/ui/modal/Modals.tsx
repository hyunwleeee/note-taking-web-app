import { useModals, useModalsDispatch } from '@contexts/modal.context';
import { Suspense } from 'react';

const Modals = () => {
  const openedModals = useModals();
  const dispatch = useModalsDispatch();

  return (
    <>
      {openedModals.map((modal, index) => {
        const { Component, props } = modal;
        const { onSubmit, ...restProps } = props;

        const onClose = () => {
          dispatch({ type: 'close', Component });
        };

        return (
          <Suspense fallback={<></>} key={index}>
            <Component
              {...restProps}
              onClose={onClose}
              onSubmit={onSubmit}
            />
          </Suspense>
        );
      })}
    </>
  );
};

export default Modals;

