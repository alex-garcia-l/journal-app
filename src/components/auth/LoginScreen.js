import React from 'react';
import { Link } from 'react-router-dom';

export const LoginScreen = () => {
  return (
    <>
      <h3 className="auth__title mb-5">
        <i class="fa-solid fa-user-large fa-3x mb-5"></i>
        <span>Login</span>
      </h3>
      <form>
        <input
          type="email"
          placeholder="Email"
          name="email"
          autoComplete="off"
          className="input"
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          className="input"
        />
        <button
          type="submit"
          className="btn btn-primary btn-block"
        >
          Login
        </button>

        <div className="auth__social_networks">
          <p className="auth__paragraph">
            Login with social network
          </p>
          <div className="google-btn">
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
    </>
  );
};
