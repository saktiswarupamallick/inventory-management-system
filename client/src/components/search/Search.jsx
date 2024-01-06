import React from "react";

import { BiSearch } from "react-icons/bi";

const Search = ({ value, onChange }) => {
  return (
    <div style={{display:"flex",border:"3px solid black",padding:"8px",borderRadius:"10px",backgroundColor:"white"}} >
      <BiSearch size={18} style={{margin:"9px"}}  />
      <input style={{color:"black",border:"none",padding:"10px"}}
        type="text"
        placeholder="Search products"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Search;