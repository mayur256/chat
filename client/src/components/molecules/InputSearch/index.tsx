// Top level imports
import React, { ReactElement } from "react";

// Atoms / Molecules
import Input from "../../atoms/Input";
import Search from "../../atoms/Search";

interface InputSearchProps{
  value: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void
}

// Component definition
const InputSearch = ({
  value = '',
  onChange
}: InputSearchProps): ReactElement => {

  return (
    <div className="card-header">
      <div className="input-group">
        <Input
          className="form-control search"
          placeholder="Search..."
          id="search"
          name="search"
          value={value}
          onChange={onChange}
        />
        <Search />
      </div>
    </div>
  )
}

export default InputSearch;