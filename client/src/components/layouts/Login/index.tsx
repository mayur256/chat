// Top Level imports
import { ReactElement, useState } from "react";

// react - router
import { Link } from "react-router-dom";

// Formik & Yup
import { useFormik } from "formik";
import * as Yup from "yup";

// Atoms / Molecules components
import Input from "../../atoms/Input";
import Button from "../../atoms/Button";
import FormControl from "../../molecules/FormControl";
import Checkbox from "../../molecules/Checkbox";
import ErrorMessage from "../../atoms/ErrorMessage";
import Alert, { AlertTypes } from "../../atoms/Alert";

// API service call utilities
import { login } from "../../../api/auth";

// Utilities
import { API_RESPONSE_STATUS } from "../../../utilities/Constants";
import { storeUserInLocalStorage } from "../../../utilities/Common";
import { IAuthUser } from "../../types";

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
  // state definitions
  const [alert, setAlert] = useState<{type: AlertTypes, message: string}>({
    type: 'danger',
    message: ''
  });

  // hooks
  // const navigate = useNavigate();
  // formik configuration
  const onSubmit = async (values: any): Promise<void> => {
    // reset alert message
    setAlert(prevState => ({ ...prevState, message: '' }));

    // invoke API
    const response = await login(values);
    if (!response.error && response.status === API_RESPONSE_STATUS.SUCCESS) {
      storeUserInLocalStorage(response.data as IAuthUser);
      window.location.href = '/';
    } else {
      setAlert(prevState => ({ ...prevState, message: response.data as string }));
    }
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
    <form
      className="login-form text-dodgerblue needs-validation"
      onSubmit={formik.handleSubmit}
      data-testid="login-form"
    >
      <h3 className="mb-4 text-center font-weight-bold">Welcome</h3>
      <legend className="mb-3 text-body">Please sign in to continue</legend>

      {alert.message && (
        <Alert
          message={alert.message}
          type={alert.type}
        />
      )}

      {/** Username / Email */}
      <FormControl
        className="form-floating mb-4"
      >
        <Input
          data-testid="email"
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
          <ErrorMessage
            data-testid="email-error"
            text={formik.errors.email ?? ''}
            className="text-danger"
          />
        )}
      </FormControl>
      

      {/** Password field */}
      <FormControl
        className="form-floating mb-4"
      >
        <Input
          data-testid="password"
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
          <ErrorMessage
            text={formik.errors.password ?? ''}
            className="text-danger text-break"
            data-testid="password-error"
          />
        )}
      </FormControl>

      {/** Remember me */}
      <Checkbox
        dataTestId="remember-me"
      />

      {/** Submit */}
      <Button
        type="submit"
        block
        size="lg"
        data-testid="submit-btn"
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
