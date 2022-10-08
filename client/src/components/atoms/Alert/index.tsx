// Top level imports
import { ComponentPropsWithoutRef, ReactElement } from "react";

export type AlertTypes = 'danger' | 'success' | 'primary' | 'secondary' | 'info';
// Props type definition
interface IProps extends ComponentPropsWithoutRef<"div"> {
    message: string;
    type?: AlertTypes,
};

// Component definition
const Alert = ({
    message,
    type = 'success',
    ...rest
}: IProps): ReactElement => {
    return (
        <div className={`alert alert-${type}`} role="alert" {...rest}>
            {message}
        </div>
    );
};

export default Alert;
