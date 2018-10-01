import React, { Component } from "react";

const MovieGenre = props => {
  const {
    genreItems,
    onGenreChange,
    selectGenre,
    textProperty,
    valueProperty
  } = props;
  return (
    <ul className="list-group">
      <li
        className={!selectGenre ? "list-group-item active" : "list-group-item"}
        onClick={() => onGenreChange()}
      >
        All Genres
      </li>
      {genreItems.map(item => (
        <li
          onClick={() => onGenreChange(item)}
          key={item[valueProperty]}
          className={
            selectGenre === item ? "list-group-item active" : "list-group-item"
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
