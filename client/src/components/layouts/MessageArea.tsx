// Top level imports
import { ReactElement } from "react"

// Atoms & Molecules
import Header from "../organisms/Header"
import Body from "../organisms/Body"

// Component definition
const MessageArea = (): ReactElement => {
  return (
    <div className="col-md-8 col-xl-6 chat">
      <div className="card">
        {/** Message Header */}
        <Header/>

        {/** Message Body */}
        <Body/>

        {/** Message Footer */}
        <div className="card-footer">
          <div className="input-group">
            <div className="input-group-append">
              <span className="input-group-text attach_btn">
                <i className="fas fa-paperclip"></i>
              </span>
            </div>
            <textarea name="" className="form-control type_msg" placeholder="Type your message..."></textarea>
            <div className="input-group-append">
              <span className="input-group-text send_btn">
                <i className="fas fa-location-arrow"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageArea