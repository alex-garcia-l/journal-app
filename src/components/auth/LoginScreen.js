import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogin, startLoginWithGoogle } from '../../actions/auth';

import { useForm } from '../../hooks/useForm';

export const LoginScreen = () => {

  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.ui);

  const [valuesForm, handleInputChange] = useForm({
    email: '',
    password: ''
  });

  const { email, password } = valuesForm;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(startLogin(email, password));
  }

  const handleGoogleLogin = () => {
    dispatch(startLoginWithGoogle());
  }

  return (
    <div className="animate__animated animate__fadeIn animate__faster">
      <h3 className="auth__title mb-5">
        <i className="fa-solid fa-user-large fa-3x mb-5"></i>
        <span>Login</span>
      </h3>
      <form onSubmit={handleSubmit}>
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
        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={loading}
        >
          Login
        </button>

        <div className="auth__social_networks">
          <p className="auth__paragraph">
            Login with social network
          </p>
          <div className="google-btn" onClick={handleGoogleLogin}>
            <div className="google-icon-wrapper">
              <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
        </div>

        <div className="auth__create_acount">
          <Link
            to="/auth/register"
          >
            Create account
          </Link>
        </div>
      </form>
    </div>
  );
};
