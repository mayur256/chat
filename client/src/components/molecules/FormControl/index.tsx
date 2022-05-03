// Top level imports
import { ComponentPropsWithoutRef, ReactElement, ReactNode } from "react";

// Props type definitions
interface IProps extends ComponentPropsWithoutRef<"div"> {
    children: ReactNode | ReactNode[];
}
// Component definition
const FormControl = ({
    children,
    ...rest
}: IProps): ReactElement => {
    return (
        <div {...rest}>
            {children}
        </div>
    )
};

export default FormControl;
