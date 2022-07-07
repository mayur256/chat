import { ReactElement } from "react";

// Redux hooks
import { useSelector } from "react-redux";
import { RootState } from "../../../store/types";

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
  const authUserId = useSelector((state: RootState) => state.user._id);
  const send = message.from === authUserId;
  return (
    <div className={`msg_container${send ?  '_send' : ''} text-center`}>
      <MsgPayload payload={ message.payload} />
      {/* <MessageTime time={message.timestamp} /> */}
    </div>
  )
}

export default MessageContainer