import { useReducer } from 'react';

const actions = Object.freeze({
  INPUT: 'INPUT',
  BLUR: 'BLUR',
  RESET: 'RESET',
});

const initialInputState = { value: '', isTouched: false };

const inputStateReducer = (state, action) => {
  if (action.type === actions.INPUT) {
    return { ...state, value: action.value };
  }

  if (action.type === actions.BLUR) {
    return { ...state, isTouched: true };
  }

  if (action.type === actions.RESET) {
    return initialInputState;
  }

  return state;
};

const useInput = (validateValue) => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const valueIsValid = validateValue(inputState.value); // the value used will be the enteredValue
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event) => {
    dispatch({ type: actions.INPUT, value: event.target.value });
  };

  const inputBlurHandler = () => {
    dispatch({ type: actions.BLUR });
  };

  const reset = () => {
    dispatch({ type: actions.RESET });
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
