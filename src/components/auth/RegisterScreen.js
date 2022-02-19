import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';

import { useForm } from '../../hooks/useForm';
import { removeError, setError } from '../../actions/ui';
import { startUserRegister } from '../../actions/auth';

export const RegisterScreen = () => {

  const dispatch = useDispatch();
  const { msgError, loading } = useSelector(state => state.ui);

  const [valuesForm, handleInputChange] = useForm({
    name: 'Name',
    email: 'mail@mail.com',
    password: 'abc123',
    passwordConfirm: 'abc123'
  });

  const { name, email, password, passwordConfirm } = valuesForm;

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (isFormValid()) {
      dispatch(startUserRegister(name, email, password));
    }
  }

  const isFormValid = () => {
    if (name.trim().length === 0) {
      dispatch(setError('Name is required.'));
      return false;
    }

    if (!validator.isEmail(email)) {
      dispatch(setError('Email not valid.'));
      return false;
    }

    if (password !== passwordConfirm || password.length < 5) {
      dispatch(setError('The password does not match or they are less than 6.'));
      return false;
    }

    dispatch(removeError());
    return true;
  }

  return (
    <>
      <h3 className="auth__title mb-5">
        <i className="fa-solid fa-user-plus fa-3x mb-5"></i>
        <span>Register</span>
      </h3>

      <form onSubmit={handleSubmit}>

        {
          msgError && (<div className='auth__alert-error'>{msgError}</div>)
        }

        <input
          type="text"
          placeholder="Name"
          name="name"
          autoComplete="off"
          className="input"
          value={name}
          onChange={handleInputChange}
        />

        <input
          type="email"
          placeholder="Email"
          name="email"
          autoComplete="off"
          className="input"
          value={email}
          onChange={handleInputChange}
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          className="input"
          value={password}
          onChange={handleInputChange}
        />

        <input
          type="password"
          placeholder="Confirm password"
          name="passwordConfirm"
          className="input"
          value={passwordConfirm}
          onChange={handleInputChange}
        />

        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={loading}
        >
          Register
        </button>

        <div className="auth__create_acount">
          <Link
            to="/auth/login"
          >
            Already registered?
          </Link>
        </div>
      </form>
    </>
  );
};
