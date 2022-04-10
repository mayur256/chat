// top level imports
import { ReactElement, useEffect, useState } from "react";

// React-Router
import { useNavigate } from "react-router-dom";

// atoms / molecules components
import ContactsList from "./ContactsList";
import MessageArea from "./MessageArea";
import LogoutBtn from "../molecules/LogoutBtn";
import NavHeader from "../organisms/NavHeader";

// utilities
import { logout } from "../../utilities/Common";

// Socket IO reference
import { io, Socket } from "socket.io-client";

// Types definitions for socket.io
interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

interface Message {
  type: string;
  payload: string;
  timestamp: string;
}

interface ClientToServerEvents {
  signIn: () => void;
  message: (message: Message) => void;
}

// Component definition
const Home = (): ReactElement => {
  // state definitions
  const [socket, setSocket] = useState<Socket<ServerToClientEvents, ClientToServerEvents>>()
  // hooks
  const navigate = useNavigate();

  // check if socket is connected
  // send signIn event to server
  const notifyServerOfSignIn = (socket: Socket): void => {
    socket?.emit('signIn');
  }
  
  // componentDidMount
  useEffect((): void => {
    // establish connection with server
    const socketInstance: Socket = io("http://localhost:4000");
    setSocket(socketInstance);
    
    notifyServerOfSignIn(socketInstance);
  }, [])

  // user logout event handler
  const logoutUser = (): void => {
    logout();
    socket?.disconnect();
    navigate('/login');
  }

  // send user message to server
  const sendMessage = (msgTxt: string): void => {
    const message: Message = {
      type: 'text',
      payload: msgTxt,
      timestamp: `${new Date().getTime()}`
    };

    socket?.emit('message', message);
  }

  // JSX Code
  return (
    <>
      <NavHeader>
        <LogoutBtn onClicked={logoutUser} />
      </NavHeader>
      {/** Contacts List */}
      <ContactsList />

      {/** Chat Message Area */}
      <MessageArea sendMessage={sendMessage} />
    </>
  )
  
}
export default Home;
