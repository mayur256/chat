// top level imports
import { ReactElement } from "react";

// Atoms / Molecules
import Avatar from "../../atoms/Avatar";
import UserInfo from "../../atoms/UserInfo";
import CallIcons from "../../molecules/CallIcons";
import Icon from "../../atoms/Icon";
import Dropdown from "../../molecules/DropDown";
import DropdownItem from "../../atoms/DropdownItem";

// types import
import { ContactThreadType } from "../../types";

// Props type definition
interface IProps {
  selectedContact: ContactThreadType;
}

// Component definition
const Header = ({
  selectedContact
}: IProps): ReactElement => {
  // Props destructuring to get data
  const { name, avatarSrc, online } = selectedContact;

  return (
    <>
      <div className="card-header msg_head">
        <div className="d-flex bd-highlight">

          <Avatar
            src={avatarSrc}
            online={online}
          />

          <UserInfo
            name={name}
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
