import { useReducer } from "react";

const reducer = (state, action) => {
  console.log(state);
  console.log(action);
  if (action.type === "INPUT") {
    return {
      value: action.value,
      isTouched: state.isTouched,
    };
  }
  if (action.type === "BLUR") {
    return {
      value: state.value,
      isTouched: true,
    };
  }
  if (action.type === "RESET") {
    return {
      value: '',
      isTouched: false,
    };
  }
  return {
    value: "",
    isTouched: false,
  };
};

const useInput = (validateValue) => {
  const [inputState, dispatch] = useReducer(reducer, {
    value: "",
    isTouched: false,
  });
  // walidacja
  const enteredValueIsValid = validateValue(inputState.value);

  const hasError = inputState.isTouched && !enteredValueIsValid;

  const valueChangeHandler = (e) => {
    dispatch({ type: "INPUT", value: e.target.value});
  };

  const inputBlurHandler = (e) => {
    dispatch({ type: "BLUR"});
  };

  const reset = () => {
    dispatch({ type: "RESET"});
  };

  return {
    value: inputState.value,
    isValid: enteredValueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
