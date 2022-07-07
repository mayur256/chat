// Top Level imports
import React, { ReactElement } from "react";

// Atoms & Molecules
import Avatar from "../../atoms/Avatar";
import UserStatus from "../UserStatus";

// type definitions for props
interface Props {
  name: string;
  avatarSrc: string;
  isSelected?: boolean;
  onClicked?: () => void
  online?: boolean;
}

// Component definition
const ContactThread = ({
  name,
  avatarSrc = 'https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg',
  online = false,
  isSelected,
  onClicked
}: Props): ReactElement => {
  return (
    <>
      <li className={`cursor-pointer ${isSelected ? 'active': ''}`} onClick={onClicked}>
        <div className="d-flex bd-highlight">
          {/** Contact Avatar */}
          <Avatar
            src={avatarSrc}
            online={online}
            alt={name}
          />

          {/** User Name and Status */}
          <UserStatus
            name={name}
            status={online ? 'online' : 'offline'}
          />

        </div>
      </li>
    </>
  )
}

export default ContactThread;