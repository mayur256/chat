// top level imports
import { ReactElement } from "react";

// Atoms / Molecules
import Avatar from "../../atoms/Avatar";
import UserInfo from "../../atoms/UserInfo";
import CallIcons from "../../molecules/CallIcons";
import Icon from "../../atoms/Icon";
import Dropdown from "../../molecules/DropDown";
import DropdownItem from "../../atoms/DropdownItem";

// Component definition
const Header = (): ReactElement => {
  return (
    <>
      <div className="card-header msg_head">
        <div className="d-flex bd-highlight">

          <Avatar
            src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
            online
          />

          <UserInfo
            name="Mayur"
            count={1789}
          />

          <CallIcons>
            <Icon iconKey="video" />
            <Icon iconKey="phone" />
          </CallIcons>

        </div>
        {/** Dropdown Element */}
        <Dropdown>
          <DropdownItem>
            <Icon iconKey="user-circle" /> View profile
            <Icon iconKey="users" /> Add to close friends
            <Icon iconKey="plus" /> Add to group
            <Icon iconKey="ban" /> Block
          </DropdownItem>
        </Dropdown>

      </div>
    </>
  )
}

export default Header;