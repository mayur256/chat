// React-Router
import { MemoryRouter } from "react-router-dom";

// React Testing utils
import { render, screen } from "@testing-library/react";

// Subject Component
import Login from "./index";

// Test Suite
describe('Login Page', (): void => {

    // Test Case 1
    test('Login Page is loaded', (): void => {
        // Arrange
        // render the component in jest environment
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );
        
        // Query elements
        const formEl = screen.getByTestId('login-form');
        const emailEl = screen.getByTestId('email');
        const passwordEl = screen.getByTestId('password');
        const rememberChkBox = screen.getByTestId('remember-me');
        const submitBtn = screen.getByTestId('submit-btn');

        // Assertions - to verify if all the form elements are loaded
        expect(formEl).toBeInTheDocument();
        expect(emailEl).toBeInTheDocument();
        expect(passwordEl).toBeInTheDocument();
        expect(rememberChkBox).toBeInTheDocument();
        expect(submitBtn).toBeInTheDocument();

     });
});
