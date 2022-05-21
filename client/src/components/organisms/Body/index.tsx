//top level imports
import { ReactElement } from "react";

// Atoms / Molecules
import Avatar from "../../atoms/Avatar";
import MessageContainer from "../../molecules/MessageContainer";
import Message from "../../molecules/Message";

// types
import { MessageType } from "../../types";

// props type definition
interface IProps {
  messages: MessageType[];
}

// Component definition
const Body = ({messages}: IProps): ReactElement => {
  return (
    <div className="card-body msg_card_body">
      {messages.map((message: MessageType): ReactElement => (
        <MessageContainer send={message.send} key={message.sent_at.toDateString()}>
          <Avatar
            src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
            inMsg
          />

          <Message message={message} send={message.send} />
        </MessageContainer>  
      ))}
    </div>
  )
}

export default Body;