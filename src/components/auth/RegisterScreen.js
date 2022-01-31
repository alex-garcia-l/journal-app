import React from 'react';
import { Link } from 'react-router-dom';

export const RegisterScreen = () => {
  return (
    <>
      <h3 className="auth__title mb-5">
        <i className="fa-solid fa-user-plus fa-3x mb-5"></i>
        <span>Register</span>
      </h3>
      
      <form>
        <input
          type="text"
          placeholder="Name"
          name="name"
          autoComplete="off"
          className="input"
        />

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

        <input
          type="password"
          placeholder="Confirm password"
          name="password_confirm"
          className="input"
        />

        <button
          type="submit"
          className="btn btn-primary btn-block"
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
