// Top level imports
import { ReactElement } from "react";

export type AlertTypes = 'danger' | 'success' | 'primary' | 'secondary' | 'info';
// Props type definition
interface IProps {
    message: string;
    type?: AlertTypes,
};

// Component definition
const Alert = ({
    message,
    type = 'success',
}: IProps): ReactElement => {
    return (
        <div className={`alert alert-${type}`} role="alert">
            {message}
        </div>
    );
};

export default Alert;
