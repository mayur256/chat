// Top level imports
import { ReactElement } from "react";

// react - router
import { Link } from "react-router-dom";

// Atoms / Molecules components
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import FormControl from "../molecules/FormControl";

// Component definition
const Register = (): ReactElement => {
    return (
        <form className="signup-form">
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
                        />
                    </FormControl>
                </div>
                
                <div>
                    <FormControl className="form-floating mb-4">
                        <Input
                            id="last-name"
                            name="lastName"
                            placeholder="Last Name"
                            className="form-control form-control-lg"
                        />
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
                />
            </FormControl>

            {/** Password field */}
            <FormControl className="form-floating mb-4">
                <Input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="form-control form-control-lg"
                />
            </FormControl>

            {/** Confirm Password field */}
            <FormControl className="form-floating mb-4">
                <Input
                    id="confirm-password"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="form-control form-control-lg"
                />
            </FormControl>

            {/** Submit */}
            <Button
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
