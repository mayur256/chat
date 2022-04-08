import { ReactElement } from "react";

const Search = (): ReactElement => {
  return (
    <div className="input-group-prepend">
      <span className="input-group-text search_btn">
        <i className="fas fa-search"></i>
      </span>
    </div>
  )
}

export default Search;