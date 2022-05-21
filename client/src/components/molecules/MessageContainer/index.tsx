// Top level imports
import { ReactElement, ReactNode } from "react";

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
  const send = message.from === '6287c13164341f9fa6e4480d';

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