// Top level imports
import { ReactElement } from "react";

// Type definitions for props
interface Props {
  src: string;
  online: boolean;
  alt?: string;
}

// Component definition
const Avatar = ({
  src,
  online = false,
  alt = ''
}: Props): ReactElement => {
  return (
    <div className="img_cont">
      <img src={src} className="rounded-circle user_img" alt={alt} />
      <span className={`online_icon ${!online ? 'offline' : ''}`}></span>
    </div>
  )
}

export default Avatar;