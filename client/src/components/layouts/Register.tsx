// Top level imports
import { ReactElement } from "react";

// react - router
import { Link } from "react-router-dom";

// Formik & Yup
import { useFormik } from "formik";
import * as Yup from "yup";

// Atoms / Molecules components
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import FormControl from "../molecules/FormControl";
import ErrorMessage from "../atoms/ErrorMessage";

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
    // hooks
    // formik configuration
    const onSubmit = (values: any): void => {
        console.log(values);
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
    /*const { errors, touched, values } = formik;
    console.log({ errors, touched, values });*/

    return (
        <form className="signup-form" onSubmit={formik.handleSubmit}>
            <legend className="mb-4 text-center">Please register to begin using this application</legend>

            {/** Name Section */}
            <div className="row">
                <div className="col-xs-12 col-md-6">
                    <FormControl className="form-floating mb-4">
                        <Input
                            id="first-name"
                            name="firstName"
                            placeholder="First Name"
                            className="form-control form-control-lg"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />

                        {formik.touched.firstName && (
                            <ErrorMessage text={formik.errors.firstName ?? ''} className="text-danger" />
                        )}
                    </FormControl>
                </div>
                
                <div>
                    <FormControl className="form-floating mb-4">
                        <Input
                            id="last-name"
                            name="lastName"
                            placeholder="Last Name"
                            className="form-control form-control-lg"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />

                        {formik.touched.lastName && (
                            <ErrorMessage text={formik.errors.lastName ?? ''} className="text-danger" />
                        )}
                    </FormControl>
                </div>
            </div>

            {/** Username / Email */}
            <FormControl className="form-floating mb-4">
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
                    placeholder="Password"
                    className="form-control form-control-lg"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />

                {formik.touched.password && (
                    <ErrorMessage text={formik.errors.password ?? ''} className="text-danger" />
                )}
            </FormControl>

            {/** Confirm Password field */}
            <FormControl className="form-floating mb-4">
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

                {formik.touched.confirmPassword && (
                    <ErrorMessage text={formik.errors.confirmPassword ?? ''} className="text-danger" />
                )}
            </FormControl>

            {/** Submit */}
            <Button
                type="submit"
                block
                size="lg"
            >
                Register
            </Button>

            <div className="mt-4 mb-4 text-dark text-center">
                <h5>Already registered ?
                Go to <Link to="/login">Sign In</Link></h5>
            </div>
        </form>
    );
}

export default Register;
