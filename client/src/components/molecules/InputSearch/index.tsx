// Top level imports
import { ReactElement } from "react";

// Atoms / Molecules
import Input from "../../atoms/Input";
import Search from "../../atoms/Search";

// Component definition
const InputSearch = (): ReactElement => {
  return (
    <div className="card-header">
      <div className="input-group">
        <Input
          className="form-control search"
          placeholder="Search..."
          id="search"
          name="search"
          value=""
          onChange={(e) => console.log(e)}
        />
        <Search />
      </div>
    </div>
  )
}

export default InputSearch;