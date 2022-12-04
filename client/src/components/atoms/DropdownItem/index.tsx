// top level imports
import { ReactElement, ReactNode } from "react";

// type definitions for props
type CProps = {
    children: ReactNode | ReactNode[],
    eventKey?: string;
    onItemClicked?: (key?: string) => void
}
// Component definition
const DropdownItem = ({
    children,
    eventKey = '',
    onItemClicked
}: CProps): ReactElement => {
    return (
        <li
            className="dropdown-item"
            style={{ cursor: 'pointer' }}
            onClick={() => {
                if (onItemClicked) {
                    onItemClicked(eventKey)
                }
            }}
        >
            {children}
        </li>
    )
}

export default DropdownItem;