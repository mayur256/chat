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
    <div className={`d-flex justify-content-${send ? 'end' : 'start'} mb-4`}>
      {children}
    </div>
  )
}

export default MessageContainer;