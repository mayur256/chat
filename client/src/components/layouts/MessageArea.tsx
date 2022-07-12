// Top level imports
import { ReactElement } from "react";

// Socket IO
import { Socket } from "socket.io-client";

// Atoms & Molecules
import Header from "../organisms/Header"
import Body from "../organisms/Body"
import Footer from "../organisms/Footer"

// types
import { MessageType, ContactThreadType, ClientToServerEvents, ServerToClientEvents } from '../types';

// props type definitions
interface IProps {
  selectedContact: ContactThreadType;
  messages: MessageType[];
  sendMessage: (message: string) => void;
  socket?: Socket<ClientToServerEvents, ServerToClientEvents>
};

// Component definition
const MessageArea = ({
  selectedContact,
  sendMessage,
  messages,
  socket
}: IProps): ReactElement => {
  return (
    <div className="col-md-8 col-xl-6 col-sm-7 chat">
      <div className="card">
        
        {/** Message Header */}
        <Header
          selectedContact={selectedContact}
        />

        {/** Message Body */}
        <Body
          selectedContact={selectedContact}
          messages={messages}
          socket={socket}
        />

        {/** Message Footer */}
        <Footer
          sendMessage={sendMessage}
          socket={socket}
        />

      </div>
    </div>
  )
}

export default MessageArea;
