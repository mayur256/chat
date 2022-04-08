import { ReactElement, ReactNode } from "react";

// Props Types definitions
type IProps = {
  children: ReactNode | ReactNode[]
}
// Component definition
const CallIcons = ({ children }: IProps): ReactElement => {
  return (
    <div className="video_cam">
      {children}
    </div>
  )
}

export default CallIcons