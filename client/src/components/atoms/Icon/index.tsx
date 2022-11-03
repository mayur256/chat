// top level imports
import { ReactElement } from "react";

// Prop typ definitions
interface IProps {
  iconKey: string;
}

//Component definitions
const Icon = ({iconKey}: IProps): ReactElement => {
  return (
    <span>
      <i className={`fas fa-${iconKey}`}></i>
    </span>
  )
}

export default Icon;