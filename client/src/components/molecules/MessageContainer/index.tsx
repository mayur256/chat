// Top level imports
import { ReactElement, ReactNode } from "react";

// Redux hooks
import { useSelector } from "react-redux";
import { RootState } from "../../../store/types";

// types
import { MessageType } from "../../types";

// type definitions for props
type CProps = {
  children: ReactNode | ReactNode[],
 message: MessageType
}
const MessageContainer = ({
  children,
  message
}: CProps): ReactElement => {
  const authUserId = useSelector((state: RootState) => state.user._id);
  const send = message.from === authUserId;

  return (
    <div className={`d-block mb-4 clearfix`}>
      <div
        className={`d-flex ${send ? 'flex-row-reverse align-items-end' : ''}`}
        style={{ 
          maxWidth: '80%',
          float: send ? 'right' : 'none',
         }}
      >
        {children}
      </div>
    </div>
  )
}

export default MessageContainer;