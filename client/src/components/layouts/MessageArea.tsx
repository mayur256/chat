// Top level imports
import { ReactElement } from "react"

// Atoms & Molecules
import Header from "../organisms/Header"
import Body from "../organisms/Body"
import Footer from "../organisms/Footer"

// types
import { MessageType, ContactThreadType } from '../types';

// props type definitions
interface IProps {
  selectedContact: ContactThreadType;
  messages: MessageType[];
  sendMessage: (message: string) => void;
};

// Component definition
const MessageArea = ({
  selectedContact,
  sendMessage,
  messages,
}: IProps): ReactElement => {
  return (
    <div className="col-md-8 col-xl-6 chat">
      <div className="card">
        
        {/** Message Header */}
        <Header
          selectedContact={selectedContact}
        />

        {/** Message Body */}
        <Body messages={messages}/>

        {/** Message Footer */}
        <Footer sendMessage={sendMessage}/>

      </div>
    </div>
  )
}

export default MessageArea