// Top level imports
import { ReactElement, useEffect, useState } from "react";

// react-redux
import { useSelector } from "react-redux";
import { RootState } from "../../store/types";

// Socket IO reference
import { io, Socket } from "socket.io-client";

// atoms / molecules components
import Navbar from "../organisms/Navbar";
import ContactsList from "./ContactsList";
import MessageArea from "./MessageArea";
import Alert from "../atoms/Alert";

// types
import { ContactThreadType, MessageType } from '../types';

// API services
import { getUsers } from "../../api/user";
import { getMessages } from "../../api/message";

// Constants
import { API_RESPONSE_STATUS } from "../../utilities/Constants";

// Types definitions for socket instance
import { ServerToClientEvents, ClientToServerEvents } from "../types";

// Component definition
const Home = (): ReactElement => {
  const SOCKET_SERVER_ENDPOINT = "http://localhost:4001";
  
  // state definitions
  const [socket, setSocket] = useState<Socket<ServerToClientEvents, ClientToServerEvents>>()
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [contacts, setContacts] = useState<ContactThreadType[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<ContactThreadType[]>([]);
  const [selectedContact, setSelectedContact] = useState<ContactThreadType | null>(null);

  // hooks
  // const navigate = useNavigate();
  const authUserId = useSelector((state: RootState) => state.user._id);

  // check if socket is connected
  // send signIn event to server
  const notifyServerOfSignIn = (socket: Socket): void => {
    socket?.emit('signIn', authUserId);
  }
  
  // componentDidMount
  useEffect(() => {
    // establish connection with server
    const socketInstance: Socket = io(SOCKET_SERVER_ENDPOINT);
    setSocket(socketInstance);
    fetchUsers();
    notifyServerOfSignIn(socketInstance);
    registerSocketServerEvents(socketInstance);
  }, []);

  // invoke API to fetch users
  const fetchUsers = async(): Promise<void> => {
    const payload = await getUsers();
    if (!payload.error && API_RESPONSE_STATUS.SUCCESS === payload.status && payload.data.length > 0) {
      const users: ContactThreadType[] = payload.data.map((user, idx) => idx === 0 ? { ...user, isSelected: true } : user);
      
      setContacts(users);
      setFilteredContacts(users);
      setSelectedContact(users[0]);
      fetchMessages(users[0]._id);
    } else if (!payload.data.length) {
      (document.querySelector("#logout-btn") as HTMLDivElement)?.click();
    }
  }

  // send user message to server
  const sendMessage = (msgTxt: string): void => {
    const message: MessageType = {
      from: authUserId,
      to: selectedContact?._id ?? '',
      type: 'text',
      payload: msgTxt,
      sent_at: new Date(),
      send: true
    };

    socket?.emit('message', message);
  }

  // contact selected
  const onContactSelected = (contactId: string): void => {    
    const transformedContacts: ContactThreadType[] = filteredContacts.map((contact: ContactThreadType): ContactThreadType => { 
      if (contactId === contact._id) {
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
    const contact = transformedContacts.find(({ _id }): boolean => contactId === _id);
    if (contact) setSelectedContact(contact);

    fetchMessages(contactId);
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
  };

  // fetches messages based on selected contact
  const fetchMessages = async (threadId: string): Promise<void> => {
    if (threadId) {
      const response = await getMessages(threadId);
      if (!response.error && API_RESPONSE_STATUS.SUCCESS === response.status) {
        setMessages(response.data);
      }
    }
  }

  // register server to client events
  const registerSocketServerEvents = (socket: Socket): void => {
    socket?.on('echoMessage', handleEchoedMessage);
    socket?.on('isOnline', handleUserOnline);
    socket?.on('user-disconnected', handleUserDisconnected);
  }

  // handles echoed mesage from server
  const handleEchoedMessage = (message: MessageType): void => {
    setMessages(prevMsg => [...prevMsg, message]);
  }

  // handles user online socket event
  const handleUserOnline = (userId: string) => {
    changeContactOnlineStatus(userId, true);
  }

  // handles user-disconnected socket event
  const handleUserDisconnected = (userId: string) => {
    changeContactOnlineStatus(userId, false);
  }

  // changes contacts online status
  const changeContactOnlineStatus = (userId: string, onlineStatus: boolean): void => {
    setFilteredContacts((prevState: ContactThreadType[]): ContactThreadType[] => {
      return prevState.map((contact: ContactThreadType): ContactThreadType => {
        if (contact._id === userId) {
          const tContact = { ...contact, online: onlineStatus };
          setSelectedContact(tContact);
          return tContact
        };
        return contact;
      })
    });
  }

  // JSX Code
  return (
    <>
      <Navbar />

      <div className="col-md-12 messages-alert-container">
        <Alert
          message="Chat message are not persisted in production!"
          type="danger"
        />
      </div>
      
      <ContactsList
        contacts={filteredContacts}
        contactSelected={onContactSelected}
        initiateSearch={onSearchInitiated}
      />

      {/** Chat Message Area */}
      {selectedContact && (
        <MessageArea
          selectedContact={selectedContact}
          sendMessage={sendMessage}
          messages={messages}
          socket={socket}
        />
      )}
    </>
  )
  
}
export default Home;
