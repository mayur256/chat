//top level imports
import { ReactElement, useEffect, useState } from "react";

// Socket IO
import { Socket } from "socket.io-client";

// Atoms / Molecules
import Avatar from "../../atoms/Avatar";
import MessageContainer from "../../molecules/MessageContainer";
import Message from "../../molecules/Message";

// types
import { MessageType, ServerToClientEvents, ClientToServerEvents, ContactThreadType } from "../../types";

// props type definition
interface IProps {
  selectedContact: ContactThreadType;
  messages: MessageType[];
  socket?: Socket<ServerToClientEvents, ClientToServerEvents>
}

// Component definition
const Body = ({ messages, socket, selectedContact }: IProps): ReactElement => {
  // state declarations
  const [isTyping, setIsTyping] = useState<boolean>(false);

  // component did mount
  useEffect(() => {
    registerSocketServerEvents(socket);
  }, []);
  

  // register server to client events
  const registerSocketServerEvents = (socket: Socket<ServerToClientEvents, ClientToServerEvents> | undefined): void => {
    socket?.on('typing', (userId: string) => {
      if (userId === selectedContact._id) {
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 1000);
      }
    });
  }

  return (
    <div className="card-body msg_card_body">
      {Boolean(messages.length) && messages.map((message: MessageType): ReactElement => (
        <MessageContainer message={message} key={message._id}>
          <Avatar
            src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
            inMsg
          />

          <Message message={message} />
        </MessageContainer>  
      ))}

      {isTyping && <div className="typing-status">{selectedContact.name} is typing...</div>}
    </div>
  )
}

export default Body;
