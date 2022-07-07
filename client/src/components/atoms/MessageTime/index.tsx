import { ReactElement } from "react";

// Moment
import moment from 'moment';

// props type definition
interface IProps {
  time: number;
};

// component definition
const MessageTime = ({time}: IProps): ReactElement => {
  return (
    <span className="msg_time">{moment(time).format('hh:mm A')}</span>
  )
}

export default MessageTime;