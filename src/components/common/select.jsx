import React from "react";

const SelectInput = props => {
  const {
    dataList,
    textProperty,
    valueProperty,
    value,
    name,
    label,
    error,
    onChange
  } = props;
  return (
    <div className="form-group">
      <label htmlFor="genre">{label}</label>
      <select
        onChange={onChange}
        value={value}
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
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};
SelectInput.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};
export default SelectInput;
