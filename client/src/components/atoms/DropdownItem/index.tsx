// top level imports
import { ReactElement, ReactNode } from "react";

// type definitions for props
type CProps = {
  children : ReactNode | ReactNode[]
}
// Component definition
const DropdownItem = ({ children }: CProps): ReactElement => {
  return (
    <>
      <li>
        { children }
      </li>
    </>
  )
}

export default DropdownItem;