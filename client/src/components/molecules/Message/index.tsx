import { ReactElement } from "react";

// Atoms/ Molecules
import MsgPayload from "../../atoms/MsgPayload"
// import MessageTime from "../../atoms/MessageTime";

// types
import { MessageType } from '../../types';

// type definition for props
interface IProps {
  send?: boolean;
  message: MessageType;
}

// Component definition
const MessageContainer = ({
  send = false,
  message,
}: IProps): ReactElement => {
  return (
    <div className={`msg_container${send ?  '_send' : ''} text-center`}>
      <MsgPayload payload={ message.payload} />
      {/* <MessageTime time={message.timestamp} /> */}
    </div>
  )
}

export default MessageContainer