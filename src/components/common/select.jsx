import React from "react";

const SelectInput = props => {
  const { dataList, selectedValue, name, label, onSelect } = props;
  return (
    <div className="form-group">
      <label htmlFor="genre">{label}</label>
      <select
        onChange={onSelect}
        value={selectedValue}
        className="custom-select form-control"
        name={name}
        id={name}
      >
        {dataList.map(item => (
          <option key={item._id} value={item._id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
