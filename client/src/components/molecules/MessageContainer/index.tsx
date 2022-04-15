// Top level imports
import { ReactElement, ReactNode } from "react";

// type definitions for props
type CProps = {
  children: ReactNode | ReactNode[],
  send?: boolean;
}
const MessageContainer = ({
  children,
  send = false
}: CProps): ReactElement => {
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