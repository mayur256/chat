// Top level imports
import { ReactElement } from "react";
import Icon from "../../atoms/Icon";
import TextArea from "../../atoms/TextArea";

// props type definitions
interface IProps {
  sendMessage: (message: string) => void;
};

// Component definition
const Footer = ({ sendMessage }: IProps): ReactElement => {
  // send button clicked event handler
  const sendMsgClicked = (): void => {
    const form: HTMLFormElement = document.querySelector('#msg-send-form') as HTMLFormElement;
    const message: HTMLTextAreaElement = form.elements.namedItem('message') as HTMLTextAreaElement;
    const msgVal = message.value.trim();
    if (!msgVal) return;
    sendMessage(msgVal);
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