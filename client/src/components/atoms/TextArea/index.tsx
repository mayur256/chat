// top level imports
import { ComponentPropsWithoutRef, ReactElement } from "react";

// type definition for props
interface IProps extends ComponentPropsWithoutRef<"textarea">{
  name: string;
  classnames: string; // a space separated list of class enclosed in string
  placeholder: string;
  required?: boolean;
}

// Component definition
const TextArea = ({
  name,
  classnames,
  placeholder = 'Type here',
  required = false,
  ...rest
}: IProps): ReactElement => {
  return (
    <textarea
      name={name}
      className={`form-control ${classnames}`}
      placeholder={placeholder}
      required={required}
      {...rest}
    />
  )
}

export default TextArea;