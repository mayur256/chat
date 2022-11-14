// Top level imports
import { ReactElement, useRef, useEffect } from "react";

// Socket IO
import { Socket } from "socket.io-client";

// Atoms & Molecules
import Header from "../organisms/Header"
import Body from "../organisms/Body"
import Footer from "../organisms/Footer"

// types
import {
  MessageType,
  ContactThreadType,
  ClientToServerEvents,
  ServerToClientEvents,
  TDivRef
} from '../types';

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
  // reference to the message body container
  const msgBodyRef = useRef<TDivRef>(null);

  // componentDidMount , componentDidUpdate
  useEffect((): void => {
    scrollMsgBodyToBottom();
  }, [messages]);
  
  // runs the callback on clicking send message button
  const onSendMessage = (msgVal: string): void => {    
    scrollMsgBodyToBottom();

    // a message is sent
    sendMessage(msgVal);
  }

  const scrollMsgBodyToBottom = () => {
    // scroll the container element to the bottom to display latest message
    if (msgBodyRef.current) {
      const msgBodyContainer: TDivRef = msgBodyRef.current;
      msgBodyContainer.scrollTo({
        top: +msgBodyContainer.clientHeight,
        behavior: 'smooth'
      });
    }
  }
  // Main JSX
  return (
    <div className="col-md-8 col-xl-6 col-sm-7">
      <div className="card">
        
        {/** Message Header */}
        <Header
          selectedContact={selectedContact}
          messagesLength={messages.length}
        />

        {/** Message Body */}
        <Body
          selectedContact={selectedContact}
          messages={messages}
          socket={socket}
          ref={msgBodyRef}
        />

        {/** Message Footer */}
        <Footer
          sendMessage={onSendMessage}
          socket={socket}
        />

      </div>
    </div>
  )
}

export default MessageArea;
