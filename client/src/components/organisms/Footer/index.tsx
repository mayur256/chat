// Top level imports
import { ReactElement } from "react";
import Icon from "../../atoms/Icon";
import TextArea from "../../atoms/TextArea";
// Socket IO reference
import { io, Socket } from "socket.io-client";

// Types definitions for socket.io
interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
  hello: () => void;
}

// Connecing with socket server
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io("http://localhost:4000");

// Component definition
const Footer = (): ReactElement => {
  // send button clicked event handler
  const sendMsgClicked = (): void => {
    const form: HTMLFormElement = document.querySelector('#msg-send-form') as HTMLFormElement;
    const message: HTMLTextAreaElement = form.elements.namedItem('message') as HTMLTextAreaElement;
    const msgVal = message.value.trim();
    if (!msgVal) return;
    sendMessage(msgVal);
  }

  // formsubmit event handler
  const sendMessage = (msg: string): void => {
    socket.emit('hello');
  }
  
  // JSX code
  return (
    <div className="card-footer">
      <form id="msg-send-form">
        <div className="input-group">
          <div className="input-group-append">
            <span className="input-group-text attach_btn">
              <Icon iconKey="paperclip" />
            </span>
          </div>

          <TextArea
            required
            name="message"
            classnames="type_msg"
            placeholder="Message..."
          />

          <div className="input-group-append" role="button" onClick={sendMsgClicked}>
            <span className="input-group-text send_btn">
              <Icon iconKey="location-arrow" />
            </span>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Footer;