//top level imports
import { ReactElement } from "react";

// Atoms / Molecules
import Avatar from "../../atoms/Avatar";
import MessageContainer from "../../molecules/MessageContainer";
import Message from "../../molecules/Message";

// Component definition
const Body = (): ReactElement => {
  return (
    <div className="card-body msg_card_body">
      
      <MessageContainer>
        <Avatar
            src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
            inMsg
        />
          
        <Message/>
      </MessageContainer>

      <MessageContainer send>
        <Message send/>

        <Avatar
            src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
            inMsg
        />
      </MessageContainer>

    </div>
  )
}

export default Body;