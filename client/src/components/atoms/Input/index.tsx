// Top level imports
import React, { ComponentPropsWithoutRef } from "react";

/** Prop type definitons */
interface InputProps extends ComponentPropsWithoutRef<"input"> {
  type: string;
  name: string;
  id: string;
  value: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  className: string;
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
  className = '',
  ...rest
}: Partial<InputProps>) => {

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
        {...rest}
      />
    </>
  )
}

export default Input;