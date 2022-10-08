// React-Router
import { MemoryRouter } from "react-router-dom";
// import { createMemoryHistory } from "history";

// React Testing utils
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

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

    // Test Case - 2
    test('Error is displayed for required fields', async (): Promise<void> => {
        // Arrange
        // render the component in jest environment
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        // Query elements
        const submitBtn = screen.getByTestId('submit-btn');
        
        // submit the form
        fireEvent.click(submitBtn);
        
        // error is displayed for skipping required fields
        await waitFor((): void => {
            const emailErr = screen.getByTestId('email-error');
            expect(emailErr.innerHTML.toLocaleLowerCase()).toBe('email is required!');
        });

        await waitFor((): void => {
            const passwordErr = screen.getByTestId('password-error');
            expect(passwordErr.innerHTML.toLocaleLowerCase()).toBe('password is required!');
        });
    });

    // Test Case 3
    test('Validation messages are displayed on invalid input', async (): Promise<void> => {
        // Arrange
        // render the component in jest environment
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        const invalidEmail = "a@b";
        const invalidEmailErrMsg = "Invalid Email Format";

        // Query elements
        const emailEl = screen.getByTestId('email') as HTMLInputElement;
        const submitBtn = screen.getByTestId('submit-btn');

        // Fire events
        fireEvent.change(emailEl, { target: { value: invalidEmail } });
        fireEvent.click(submitBtn);

        // Assertions
        await waitFor((): void => expect(emailEl.value).toBe(invalidEmail));
        // check for error message
        await waitFor((): void => {
            const emailErrorEl = screen.getByTestId('email-error');
            expect(emailErrorEl.innerHTML).toBe(invalidEmailErrMsg);
        });
        
    });

    // Test Case 4
    test('API returns with expected response', async (): Promise<void> => {
        // Arrange
        // render the component in jest environment
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );
        const email = 'a@b.com';
        const password = '12345678';

         // Query elements
        const emailEl = screen.getByTestId('email') as HTMLInputElement;
        const passwordEl = screen.getByTestId('password') as HTMLInputElement;
        const submitBtn = screen.getByTestId('submit-btn');
        
        // Fire events and verify state updates
        fireEvent.change(emailEl, { target: { value: email } });
        await waitFor((): void => expect(emailEl.value).toBe(email));
        fireEvent.change(passwordEl, { target: { value: password } });
        await waitFor((): void => expect(passwordEl.value).toBe(password));

        // Submit
        fireEvent.click(submitBtn);
        // No erros after submitting the form
        await waitFor((): void => {
            expect(screen.queryByTestId('response-error')).not.toBeInTheDocument();
        });
    });

    // Test Case 5
    test('API returns with expected error for invalid credentials', async (): Promise<void> => {
        // Arrange
        // render the component in jest environment
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );
        const invalidMsg = "Invalid Credentials!" // error message returned by server
        const email = 'x@y.com'; // an invalid username or email
        const password = '12345678';

        // Query elements
        const emailEl = screen.getByTestId('email') as HTMLInputElement;
        const passwordEl = screen.getByTestId('password') as HTMLInputElement;
        const submitBtn = screen.getByTestId('submit-btn');

        // Fire events and verify state updates
        fireEvent.change(emailEl, { target: { value: email } });
        await waitFor((): void => expect(emailEl.value).toBe(email));
        fireEvent.change(passwordEl, { target: { value: password } });
        await waitFor((): void => expect(passwordEl.value).toBe(password));

        // Submit the form
        fireEvent.click(submitBtn);
        // Check for the existence of error alert
        await waitFor((): void => {
            expect(screen.getByTestId('response-error')).toBeInTheDocument();
        });
        // Check if the alert contains appropriate error message returned from server
        await waitFor((): void => {
            expect(screen.getByTestId('response-error').innerHTML).toBe(invalidMsg);
        });
    });
});
