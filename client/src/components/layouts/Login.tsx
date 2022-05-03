// Top Level imports
import React, { useState, ReactElement } from "react";

// react - router
import { Link } from "react-router-dom";

// Atoms / Molecules components
import Input from "../atoms/Input";
import Button from "../atoms/Button";

// Utilities
import { login } from "../../utilities/Common";
import FormControl from "../molecules/FormControl";
import Checkbox from "../molecules/Checkbox";

// Component Definition
const Login = (): ReactElement => {
  // state definition
  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  });

  // hooks
  // const navigate = useNavigate();

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
    window.location.href = '/';
  }

  return (
    <form className="login-form text-dodgerblue" onSubmit={submitHandler}>
      <h3 className="mb-4 text-center font-weight-bold">Welcome</h3>
      <legend className="mb-3 text-body">Please sign in to continue</legend>

      {/** Username / Email */}
      <FormControl className="form-floating mb-4">
        <Input
          id="email"
          type="email"
          name="email"
          value={formValues.email}
          placeholder="Your email or username"
          className="form-control form-control-lg"
          onChange={onFormValueChange}
        />
      </FormControl>

      {/** Password field */}
      <FormControl className="form-floating mb-4">
        <Input
          id="password"
          type="password"
          name="password"
          value={formValues.password}
          placeholder="Your password"
          className="form-control form-control-lg"
          onChange={onFormValueChange}
        />
      </FormControl>

      {/** Remember me */}
      <Checkbox />

      {/** Submit */}
      <Button
        block
        size="lg"
      >
        Sign In
      </Button>

      <div className="mt-4 mb-4 text-dark text-center">
        <p>Not a member ? &nbsp;
          <Link to="/register">Register</Link></p>
      </div>
    </form>
  )
}

export default Login;