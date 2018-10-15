import React from "react";

const SearchInput = ({ name, placeholder, value, onChange }) => {
  return (
    <div className="form-group">
      <input
        type="text"
        name={name}
        id={name}
        value={value}
        className="form-control"
        placeholder={placeholder}
        onChange={e => onChange(e.currentTarget.value)}
      />
    </div>
  );
};

export default SearchInput;
