// Top level imports
import { ComponentProps, ReactElement, ReactNode } from "react"

// Props type definitions
interface IProps extends ComponentProps<"button"> {
    children: ReactNode;
    size?: string;
    color?: string;
    block?: boolean;
};
// Component definition
const Button = ({
    children,
    color = 'primary',
    block = false,
    size = 'md',
    ...rest
}: IProps): ReactElement => {
    return (
        <button
            className={`btn btn-${color} ${block ? 'btn-block' : ''} btn-${size}`}
            {...rest}
        >
            {children}
        </button>
    );
};

export default Button;
