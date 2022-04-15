import { ReactElement } from "react";

// props type definition
interface IProps {
  payload: string;
}
// component definition
const Message = ({payload}: IProps): ReactElement => {
  return (
    <span className="message">{ payload }</span>
  )
}

export default Message;