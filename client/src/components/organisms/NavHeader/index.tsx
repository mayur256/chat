// Top level imports
import { ReactElement, ReactNode } from "react";

// Props type definition
interface IProps {
    children: ReactElement[] | ReactElement | ReactNode | ReactNode[]
}

// component definition
const NavHeader = ({children}: IProps): ReactElement => {
    return (
        <div className="col-md-12 col-xl-12">
            {children}
        </div>
    )
}

export default NavHeader
