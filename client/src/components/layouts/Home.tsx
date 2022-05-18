// top level imports
import { ReactElement, useEffect, useState } from "react";

// Socket IO reference
import { io, Socket } from "socket.io-client";

// atoms / molecules components
import ContactsList from "./ContactsList";
import MessageArea from "./MessageArea";

// types
import { ContactThreadType, MessageType } from '../types';

// Utilities
// import { delay } from "../../utilities/Common";
import { mockedContactThread } from "../../utilities/mocks";

// Types definitions for socket.io
interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
  signIn: () => void;
  message: (message: MessageType) => void;
}

// message list
const mockMessages: MessageType[] = [
  {
    payload: 'Hey Bro! How are you?',
    timestamp: new Date().getTime(),
    send: true,
  },
  {
    payload: 'Hey Bro! How are you?',
    timestamp: new Date().getTime(),
  },
];

// Component definition
const Home = (): ReactElement => {
  // state definitions
  const [socket, setSocket] = useState<Socket<ServerToClientEvents, ClientToServerEvents>>()
  const [messages, setMessages] = useState<MessageType[]>(mockMessages);
  const [contacts, setContacts] = useState<ContactThreadType[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<ContactThreadType[]>([]);
  const [selectedContact, setSelectedContact] = useState<ContactThreadType>(mockedContactThread[0]);

  // hooks
  // const navigate = useNavigate();

  // check if socket is connected
  // send signIn event to server
  const notifyServerOfSignIn = (socket: Socket): void => {
    socket?.emit('signIn');
  }
  
  // componentDidMount
  useEffect((): void => {
    // establish connection with server
    const socketInstance: Socket = io("http://localhost:4001");
    setSocket(socketInstance);
    fetchUsers();
    notifyServerOfSignIn(socketInstance);
  }, []);

  // invoke API to fetch users
  const fetchUsers = async(): Promise<void> => {
    // mimick API call
    //await delay(2000);
    setContacts(mockedContactThread);
    setFilteredContacts(mockedContactThread);
  }

  // user logout event handler
  /*const logoutUser = (): void => {
    logout();
    socket?.disconnect();
    navigate('/login');
  }*/

  // send user message to server
  const sendMessage = (msgTxt: string): void => {
    const message: MessageType = {
      type: 'text',
      payload: msgTxt,
      timestamp: new Date().getTime(),
      send: true
    };

    socket?.emit('message', message);
    setMessages(prevMessages => ([...prevMessages, message]));
  }

  // contact selected
  const onContactSelected = (contactId: string): void => {
    const transformedContacts: ContactThreadType[] = filteredContacts.map((contact: ContactThreadType): ContactThreadType => { 
      if (contactId === contact.id) {
        return {
          ...contact,
          isSelected: true,
        }
      }

      return {
        ...contact,
        isSelected: false
      }
    });

    setFilteredContacts(transformedContacts);

    // find and set selected contact
    const contact = transformedContacts.find(({ id }): boolean => contactId === id);
    if (contact) setSelectedContact(contact);
  }

  // handles filtering of contacts based on user search query
  const onSearchInitiated = (searchKey: string): void => {
    if (!searchKey.trim()) {
      setFilteredContacts(contacts);
      return;
    }

    const filterResult = contacts.filter(
      (contact: ContactThreadType) => contact.name.toLowerCase().includes(searchKey.toLowerCase())
    );
    setFilteredContacts(filterResult);
  }

  // JSX Code
  return (
    <>
      <ContactsList
        contacts={filteredContacts}
        contactSelected={onContactSelected}
        initiateSearch={onSearchInitiated}
      />

      {/** Chat Message Area */}
      <MessageArea
        selectedContact={selectedContact}
        sendMessage={sendMessage}
        messages={messages}
      />
    </>
  )
  
}
export default Home;
