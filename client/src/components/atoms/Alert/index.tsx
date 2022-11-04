// Top level imports
import { ComponentPropsWithoutRef, ReactElement } from "react";

export type AlertTypes = 'danger' | 'success' | 'primary' | 'secondary' | 'info';
// Props type definition
interface IProps extends ComponentPropsWithoutRef<"div"> {
    message: string;
    type?: AlertTypes,
    dismissable?: boolean
};

// Component definition
const Alert = ({
    message,
    type = 'success',
    dismissable = false,
    ...rest
}: IProps): ReactElement => {
    return (
        <div className={`alert alert-${type} ${dismissable ? 'alert-dismissible' : ''} fade show`} role="alert" {...rest}>
            {message}
            {dismissable && (
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            )}
        </div>
    );
};

export default Alert;
