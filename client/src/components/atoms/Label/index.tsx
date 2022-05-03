// Top level imports
import { ComponentPropsWithoutRef, ReactElement } from "react";

// Props type definitions
interface IProps extends ComponentPropsWithoutRef<"label"> {
    text: string;
    required?: boolean
};

// Component definition
const Label = ({
    text,
    required = false,
    ...rest
}: IProps): ReactElement => {
    return (
        <label {...rest}>
            {text} {required && <span className="text-danger">*</span>}
        </label>
    );
};

export default Label;
