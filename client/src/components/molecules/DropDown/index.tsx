// Top Level Imports
import { ReactElement, ReactNode } from "react";

// Atoms / Molecules
import Icon from "../../atoms/Icon";

//type definitions for props
type CProps = {
  children: ReactNode | ReactNode[]
}

// Component definition
const Dropdown = ({ children }: CProps):ReactElement => {
  return (
    <>
      {/** Dropdown trigger */}
      <span id="action_menu_btn">
        <Icon iconKey="ellipsis-v"/>
      </span>

      {/** Items Container */}
      <div className="action_menu">
        <ul>
          { children }
        </ul>
      </div>
    </>
  )
}

export default Dropdown;