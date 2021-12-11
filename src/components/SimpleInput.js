import { useState } from 'react';
import validateEmail from '../utils/validateEmail';

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState('');
  const [enteredNameIsTouched, setEnteredNameIsTouched] = useState(false);

  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredEmailIsTouched, setEnteredEmailIsTouched] = useState(false);

  const enteredNameIsValid = enteredName.trim() !== '';
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameIsTouched;

  const enteredEmailIsValid =
    enteredEmail.trim() !== '' && validateEmail(enteredEmail);
  const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailIsTouched;

  const formIsValid = enteredNameIsValid && enteredEmailIsValid;

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const nameInputBlurHandler = () => {
    setEnteredNameIsTouched(true);
  };

  const emailInputChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const emailInputBlurHandler = () => {
    setEnteredEmailIsTouched(true);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    setEnteredNameIsTouched(true);
    setEnteredEmailIsTouched(true);

    if (!enteredNameIsValid) {
      return;
    }

    console.log(enteredName);
    console.log(enteredEmail);

    setEnteredName('');
    setEnteredNameIsTouched(false);

    setEnteredEmail('');
    setEnteredEmailIsTouched(false);
  };

  const nameInputClasses = `form-control ${
    nameInputIsInvalid ? 'invalid' : ''
  }`;

  const emailInputClasses = `form-control ${
    emailInputIsInvalid ? 'invalid' : ''
  }`;

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          value={enteredName}
          onBlur={nameInputBlurHandler}
        />
        {nameInputIsInvalid && (
          <p className="error-text">Name must not be empty</p>
        )}
      </div>

      <div className={emailInputClasses}>
        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          id="email"
          onChange={emailInputChangeHandler}
          value={enteredEmail}
          onBlur={emailInputBlurHandler}
        />
        {emailInputIsInvalid && (
          <p className="error-text">
            Email must not be empty and must be valid
          </p>
        )}
      </div>

      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
