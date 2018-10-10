import React from "react";

const SelectInput = props => {
  const {
    dataList,
    textProperty,
    valueProperty,
    selectedValue,
    name,
    label,
    onSelect
  } = props;
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
          <option key={item[valueProperty]} value={item[valueProperty]}>
            {item[textProperty]}
          </option>
        ))}
      </select>
    </div>
  );
};
SelectInput.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};
export default SelectInput;
