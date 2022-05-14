// Top Level imports
import React, { ReactElement } from "react";

// react - router
import { Link } from "react-router-dom";

// Formik & Yup
import { useFormik } from "formik";
import * as Yup from "yup";

// Atoms / Molecules components
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import FormControl from "../molecules/FormControl";
import Checkbox from "../molecules/Checkbox";
import ErrorMessage from "../atoms/ErrorMessage";

// API service call utilities
import { login } from "../../api/auth";

// Utilities
// import { login } from "../../utilities/Common";

// validation schema definition with Yup
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid Email Format')
    .required('Email is Required!'),
  
  password: Yup.string()
    .required('Password is required!')
});

// Component Definition
const Login = (): ReactElement => {
  // hooks
  // formik configuration
  const onSubmit = async (values: any): Promise<void> => {
    await login(values);
  }
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit,
    validationSchema,
  });

  return (
    <form className="login-form text-dodgerblue needs-validation" onSubmit={formik.handleSubmit}>
      <h3 className="mb-4 text-center font-weight-bold">Welcome</h3>
      <legend className="mb-3 text-body">Please sign in to continue</legend>

      {/** Username / Email */}
      <FormControl className="form-floating mb-4">
        <Input
          id="email"
          type="email"
          name="email"
          value={formik.values.email}
          placeholder="Your email or username"
          className="form-control form-control-lg"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {formik.touched.email && (
          <ErrorMessage text={formik.errors.email ?? ''} className="text-danger" />
        )}
      </FormControl>
      

      {/** Password field */}
      <FormControl className="form-floating mb-4">
        <Input
          id="password"
          type="password"
          name="password"
          value={formik.values.password}
          placeholder="Your password"
          className="form-control form-control-lg"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {formik.touched.password && (
          <ErrorMessage text={formik.errors.password ?? ''} className="text-danger text-break" />
        )}
      </FormControl>

      {/** Remember me */}
      <Checkbox />

      {/** Submit */}
      <Button
        type="submit"
        block
        size="lg"
      >
        Sign In
      </Button>

      <div className="mt-4 mb-4 text-dark text-center">
        <h5>Not a member ? &nbsp;
          <Link to="/register">Register</Link></h5>
      </div>
    </form>
  )
}

export default Login;