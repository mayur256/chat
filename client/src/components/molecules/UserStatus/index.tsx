// Top level imports
import { ReactElement } from "react";


// type definitions for props
type Status = 'online' | 'offline'
interface Props {
  name: string;
  status: Status;
}

// Component definition
const UserStatus = ({
  name,
  status
}: Props): ReactElement => {
  return (
    <div className="user_info">
      <span>{name}</span>
      <p>{name} is {status}</p>
    </div>
  )
}

export default UserStatus;