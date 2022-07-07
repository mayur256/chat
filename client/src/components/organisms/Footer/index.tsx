// Top level imports
import React, { ReactElement, useState } from "react";
import Icon from "../../atoms/Icon";
import TextArea from "../../atoms/TextArea";

// props type definitions
interface IProps {
  sendMessage: (message: string) => void;
};

// Component definition
const Footer = ({ sendMessage }: IProps): ReactElement => {
  const [msgValue, setMsgValue] = useState('');

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