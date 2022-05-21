import { ReactElement } from "react";

// Atoms/ Molecules
import MsgPayload from "../../atoms/MsgPayload"
// import MessageTime from "../../atoms/MessageTime";

// types
import { MessageType } from '../../types';

// type definition for props
interface IProps {
  message: MessageType;
}

// Component definition
const MessageContainer = ({
  message,
}: IProps): ReactElement => {
  const send = message.from === '6287c13164341f9fa6e4480d';
  return (
    <div className={`msg_container${send ?  '_send' : ''} text-center`}>
      <MsgPayload payload={ message.payload} />
      {/* <MessageTime time={message.timestamp} /> */}
    </div>
  )
}

export default MessageContainer