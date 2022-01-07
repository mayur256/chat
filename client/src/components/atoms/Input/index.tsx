// Top level imports
import React from "react";

/** Prop type definitons */
interface InputProps {
  type?: string;
  name?: string;
  id?: string;
  value?: string;
  onChange?: (e: React.SyntheticEvent) => void;
  className?: string;
  placeholder: string;
}

// Component definition
const Input = ({
  type = 'text',
  name = '',
  id = '',
  value = '',
  onChange,
  placeholder =  '',
  className = ''
}: InputProps) => {

  // JSX Code
  return (
    <>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={className}
      />
    </>
  )
}

export default Input;