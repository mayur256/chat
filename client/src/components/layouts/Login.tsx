// Top Level imports
import React, { useState, ReactElement } from "react";

import { useNavigate } from "react-router-dom";

// Atoms / Molecules components
import Input from "../atoms/Input";

// Utilities
import { login } from "../../utilities/Common";

// Component Definition
const Login = (): ReactElement => {
  // state definition
  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  });

  // hooks
  const navigate = useNavigate();

  // Change event handler for form elements
  const onFormValueChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormValues(previousValues => {
      return {
        ...previousValues,
        [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value
      }
    })
  }

  // form submit event handler
  const submitHandler = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const { email } = formValues;
    await login(email);
    setTimeout((): void => { 
      navigate('/', { replace: true });
    }, 1000);
  }

  return (
    <>
      <form className="login-form" onSubmit={submitHandler}>
        <legend className="mb-3">Welcome</legend>
        <div className="mb-4">
          <label htmlFor="email" className="form-label">
            Email or Username<span className="text-danger">*</span>
          </label>

          <Input
            id="email"
            type="email"
            name="email"
            value={formValues.email}
            placeholder="Your email or username"
            className="form-control"
            onChange={onFormValueChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="form-label">
            Password<span className="text-danger">*</span>
          </label>

          <Input
            id="password"
            type="password"
            name="password"
            value={formValues.password}
            placeholder="Your password"
            className="form-control"
            onChange={onFormValueChange}
          />
        </div>

        <button
          className="btn btn-primary btn-block"
          type="submit"
        >
          Sign In
        </button>
      </form>
    </>
  )
}

export default Login;