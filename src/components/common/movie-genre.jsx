import React, { Component } from "react";

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
