// React-Router
import { MemoryRouter } from "react-router-dom";

// React Testing utils
import { render, screen } from "@testing-library/react";

// Subject Component
import Register from "./index";

// Test Suite
describe('Registration Page', (): void => {

    // Test Case 1
    test('Registration page is loaded', (): void => {
        // Arrange
        // render the component in jest environment
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );

        // Query elements
        const formEl = screen.getByTestId('register-form');
        const firstNameEl = screen.getByTestId('first-name');
        const lastNameEl = screen.getByTestId('last-name');
        const emailEl = screen.getByTestId('email');
        const passwordEl = screen.getByTestId('password');
        const confirmassEl = screen.getByTestId('confirm-password');
        const submitBtn = screen.getByTestId('register-submit');

        // Assertions - to verify if all the form elements are loaded
        expect(formEl).toBeInTheDocument();
        expect(firstNameEl).toBeInTheDocument();
        expect(lastNameEl).toBeInTheDocument();
        expect(emailEl).toBeInTheDocument();
        expect(passwordEl).toBeInTheDocument();
        expect(confirmassEl).toBeInTheDocument();
        expect(submitBtn).toBeInTheDocument();

    });
});
