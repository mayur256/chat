// Top level imports
import { ReactElement } from "react";

// Type definitions for props
interface Props {
  src: string;
  online?: boolean;
  alt?: string;
  inMsg?: boolean;
}

// Component definition
const Avatar = ({
  src,
  online = false,
  alt = '',
  inMsg = false
}: Props): ReactElement => {
  return (
    <div className={`img_cont${inMsg ? '_msg' : ''}`}>
      <img src={src} className={`rounded-circle user_img${inMsg ? '_msg' : ''}`} alt={alt} />
      {
        inMsg ? null : (<span className={`online_icon ${!online ? 'offline' : ''}`}></span>)
      }       
    </div>
  )
}

export default Avatar;