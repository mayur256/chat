// Top level imports
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
import ErrorMessage from "../../atoms/ErrorMessage";
import Alert, { AlertTypes } from "../../atoms/Alert";

// API services
import { register } from "../../../api/auth";
import { API_RESPONSE_STATUS } from "../../../utilities/Constants";

// validation schema definition with Yup
const validationSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('First Name is Required!'),

    lastName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Last Name is Required!'),

    email: Yup.string()
        .email('Invalid Email Format!')
        .required('Email is Required!'),

    password: Yup.string()
        .required('Password is required!')
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        ),

    confirmPassword: Yup.string()
        .required('Confirm Password is Required!')
        .oneOf([Yup.ref('password')], 'Passwords do not match!')
});

// Component definition
const Register = (): ReactElement => {
    // state definitions
    const [alert, setAlert] = useState<{ type: AlertTypes, message: string }>({
        type: 'danger',
        message: ''
    });

    // hooks
    // formik configuration
    const onSubmit = async (values: any): Promise<void> => {
        // reset alert message
        setAlert(prevState => ({ ...prevState, message: '' }));

        const { firstName, lastName, email, password } = values;
        //invoke register API
        const response = await register({ firstName, lastName, email, password });
        if (response.status === API_RESPONSE_STATUS.SUCCESS && !response.error) {
            formik.resetForm();
            setAlert({
                type: 'success',
                message: 'Congratulations! Account created. Please proceed to login'
            });
        } else {
            setAlert(prev => ({ ...prev, message: response.data as string }));
        }
    }
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        onSubmit,
        validationSchema,
    });

    return (
        <form
            className="signup-form"
            onSubmit={formik.handleSubmit}
            data-testid="register-form"
        >
            <legend className="mb-4 text-center">Please register to begin using this application</legend>

            {alert.message && (
                <Alert
                    message={alert.message}
                    type={alert.type}
                />
            )}

            {/** Name Section */}
            <div className="row">
                <div className="col-xs-12 col-md-6">
                    <FormControl
                        className="form-floating mb-4"
                        data-testid="first-name"
                    >
                        <Input
                            id="first-name"
                            name="firstName"
                            placeholder="First Name"
                            className="form-control form-control-lg"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />

                        {formik.touched.firstName && formik.errors.firstName && (
                            <ErrorMessage text={formik.errors.firstName ?? ''} className="text-danger" />
                        )}
                    </FormControl>
                </div>

                <div>
                    <FormControl
                        className="form-floating mb-4"
                        data-testid="last-name"
                    >
                        <Input
                            id="last-name"
                            name="lastName"
                            placeholder="Last Name"
                            className="form-control form-control-lg"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />

                        {formik.touched.lastName && formik.errors.lastName && (
                            <ErrorMessage text={formik.errors.lastName ?? ''} className="text-danger" />
                        )}
                    </FormControl>
                </div>
            </div>

            {/** Username / Email */}
            <FormControl className="form-floating mb-4" data-testid="email">
                <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="form-control form-control-lg"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />

                {formik.touched.email && formik.errors.email && (
                    <ErrorMessage text={formik.errors.email ?? ''} className="text-danger" />
                )}
            </FormControl>

            {/** Password field */}
            <FormControl className="form-floating mb-4" data-testid="password">
                <Input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="form-control form-control-lg"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />

                {formik.touched.password && formik.errors.password && (
                    <ErrorMessage text={formik.errors.password ?? ''} className="text-danger" />
                )}
            </FormControl>

            {/** Confirm Password field */}
            <FormControl className="form-floating mb-4" data-testid="confirm-password">
                <Input
                    id="confirm-password"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="form-control form-control-lg"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />

                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                    <ErrorMessage text={formik.errors.confirmPassword ?? ''} className="text-danger" />
                )}
            </FormControl>

            {/** Submit */}
            <Button
                type="submit"
                block
                size="lg"
                data-testid="register-submit"
            >
                Register
            </Button>

            <div className="mt-4 mb-4 text-dark text-center">
                <h5>Already registered ?
                    Go to <Link to="/login" data-testid="sign-in-link">Sign In</Link></h5>
            </div>
        </form>
    );
}

export default Register;
