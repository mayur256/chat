// Top level imports
import { ComponentPropsWithoutRef, ReactElement } from "react";

// Props type definitions
interface IProps extends ComponentPropsWithoutRef <"strong">{
    text: string;
}
// Component definition
const ErrorMessage = ({ text, ...rest }: IProps): ReactElement => {
    return (
        <strong
            style={{
                display: 'inline-block',
                maxWidth: 'fit-content'
            }}
            {...rest}
        >
            {text}
        </strong>
    )
};

export default ErrorMessage;
