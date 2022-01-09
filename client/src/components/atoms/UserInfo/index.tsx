// Top level imports
import { ReactElement } from "react";

// Props type definition
interface IProps {
  name: string;
  count: number;
}

// Component definition
const UserInfo = ({name, count}: IProps): ReactElement => {
  return (
    <div className="user_info">
      <span>Chat with {name}</span>
      <p>{count} Messages</p>
    </div>
  )
}

export default UserInfo;