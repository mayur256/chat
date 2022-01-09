import { ReactElement } from "react";

// Atoms/ Molecules
import MsgPayload from "../../atoms/MsgPayload"
import MessageTime from "../../atoms/MessageTime";

// type definition for props
interface IProps {
  send? : boolean;
}

// Component definition
const MessageContainer = ({
  send = false
}: IProps): ReactElement => {
  return (
    <div className={`msg_cotainer${send ? '_send' : ''}`}>
      <MsgPayload />
      <MessageTime/>
    </div>
  )
}

export default MessageContainer