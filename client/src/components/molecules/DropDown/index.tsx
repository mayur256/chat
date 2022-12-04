// Top Level Imports
import { ReactElement, ReactNode } from "react";

// Atoms / Molecules
import Icon from "../../atoms/Icon";
import Button from "../../atoms/Button";

//type definitions for props
type CProps = {
    children: ReactNode | ReactNode[]
    triggerSize?: string;
    triggerIconKey?: string;
}

// Component definition
const Dropdown = ({
    children,
    triggerSize,
    triggerIconKey = "ellipsis-v"
}: CProps): ReactElement => {
    return (
        <div className="dropdown">
            {/** Dropdown trigger */}
            <Button
                data-toggle="dropdown"
                aria-expanded="false"
                size={triggerSize}
            >
                <Icon iconKey={triggerIconKey} />
            </Button>

            {/** Items Container */}
            <ul className="dropdown-menu dropdown-menu-right">
                {children}
            </ul>
        </div>
    )
}

export default Dropdown;