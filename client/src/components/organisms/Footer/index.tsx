// Top level imports
import { ReactElement } from "react";
import Icon from "../../atoms/Icon";
import TextArea from "../../atoms/TextArea";

// Component definition
const Footer = (): ReactElement => {
  return (
    <div className="card-footer">
      <div className="input-group">
        <div className="input-group-append">
          <span className="input-group-text attach_btn">
            <Icon iconKey="paperclip"/>
          </span>
        </div>

        <TextArea
          name="message"
          classnames="type_msg"
          placeholder="Message..."
        />
        
        <div className="input-group-append">
          <span className="input-group-text send_btn">
            <Icon iconKey="location-arrow"/>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Footer;