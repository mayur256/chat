// top level imports
import { ReactElement } from "react";

// type definition for props
interface IProps {
  name: string;
  classnames: string; // a space separated list of class enclosed in string
  placeholder: string;
}

// Component definition
const TextArea = ({
  name,
  classnames,
  placeholder = 'Type here'
}: IProps): ReactElement => {
  return (
    <>
      <textarea
        name={name}
        className={`form-control ${classnames}`}
        placeholder={placeholder} />
    </>
  )
}

export default TextArea;