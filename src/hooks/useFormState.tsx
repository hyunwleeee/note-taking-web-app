import { useReducer } from 'react';

type FormAction<T> =
  | { type: 'set-data', value: T }
  | ({ type: keyof T; value: T[keyof T] })

const formStateReducer = <T,>(state: T, action: FormAction<T>) => {
  if (action.type === 'set-data')
    return action.value as T;

  return {
    ...state,
    [action.type]: action.value,
  };
};

const useFormState = <T,>(init: T) => {
  const [formState, formDispatch] = useReducer(
    formStateReducer<T>,
    init
  );

  return {
    formState,
    formDispatch,
  };
};


export default useFormState;
