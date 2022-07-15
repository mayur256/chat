// Top level imports
import React, { ReactElement, useState } from "react";

// react-redux
import { useSelector } from "react-redux";

// Socket IO
import { Socket } from "socket.io-client";

// Atoms / Molecules / Organisms
import Icon from "../../atoms/Icon";
import TextArea from "../../atoms/TextArea";

// types
import { ClientToServerEvents, ServerToClientEvents } from "../../types";
import { RootState } from "../../../store/types";

// props type definitions
interface IProps {
  sendMessage: (message: string) => void;
  socket?: Socket<ServerToClientEvents, ClientToServerEvents>
};

// Component definition
const Footer = ({ sendMessage, socket }: IProps): ReactElement => {
  // state declarations
  const [msgValue, setMsgValue] = useState('');

  // hooks
  const authUserId = useSelector((state: RootState): string => state.user._id);

  // send button clicked event handler
  const sendMsgClicked = (): void => {
    const msgVal = msgValue.trim();
    if (!msgVal) return;
    sendMessage(msgVal);
  }

  // handles textarea content change
  const handleMsgTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = (event.target as HTMLTextAreaElement).value;
    setMsgValue(content);
  };

  // handles key down events on textarea
  const onMsgBoxKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();

      if (msgValue.replace(/\r\n/g, '')) {
        sendMessage(msgValue);
        setMsgValue('');
      }
      return;
    }

    // emit typing event
    socket?.emit('isTyping', authUserId);
  }

  // handles key up events on textarea
  const onMsgBoxKeyUp = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter' && event.ctrlKey) {
      setMsgValue(prevVal => prevVal + '\r\n');
    }
    return;
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
            value={msgValue}
            required
            name="message"
            classnames="type_msg"
            placeholder="Message..."
            onChange={handleMsgTextAreaChange}
            onKeyDown={onMsgBoxKeyDown}
            onKeyUp={onMsgBoxKeyUp}
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
