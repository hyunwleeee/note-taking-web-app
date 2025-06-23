import { useReducer } from 'react';

const useFormState = (init) => {
  const [formState, formDispatch] = useReducer(formStateReducer, init);

  return {
    formState,
    formDispatch,
  };
};

const formStateReducer = (state, action) => {
  let result = state;

  Object.keys(state).forEach((key) => {
    if (action.type === key) {
      result = { ...state, [key]: action.value };
    }
  });

  if (action.type === 'set-data') result = action.value;

  return result;
};

export default useFormState;
