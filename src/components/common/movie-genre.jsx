import React from "react";

const MovieGenre = props => {
  const {
    genreItems,
    onGenreChange,
    selectedGenre,
    textProperty,
    valueProperty
  } = props;
  return (
    <ul className="list-group">
      {genreItems.map(item => (
        <li
          style={{ cursor: "pointer" }}
          onClick={() => onGenreChange(item)}
          key={item[valueProperty]}
          className={
            selectedGenre === item
              ? "list-group-item active"
              : "list-group-item"
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};
MovieGenre.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};
export default MovieGenre;
