// Top Level imports
import {ReactElement, ReactNode } from "react";

// type definitions for props
interface IProps {
  children: ReactNode | ReactNode[];
}

const ContactThreads = ({ children }: IProps): ReactElement => {
  return (
    <div className="card-body contacts_body">
      <ul className="contacts">
        { children }
      </ul>
    </div>
  )
}

export default ContactThreads;