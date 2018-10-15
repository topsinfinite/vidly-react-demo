import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getGenres } from "../services/fakeGenreService";
import { saveMovie, getMovie } from "../services/fakeMovieService";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    genres: [{ _id: "", name: "...Select Genre..." }, ...getGenres()],
    errors: {}
  };
  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),

    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .label("Number in stock")
      .required(),
    dailyRentalRate: Joi.number()
      .min(1)
      .max(10)
  };
  componentDidMount() {
    const { match } = this.props;
    const movieId = match.params.id;
    if (movieId === "new") return;

    const movie = getMovie(movieId);
    if (!movie) return this.props.history.push("/notfound");

    this.setState({ data: this.mapMovieToViewModel(movie) });
  }
  doSubmit = () => {
    const { data: movie } = this.state;
    saveMovie(movie);
    this.props.history.push("/movies");
  };
  mapMovieToViewModel = movie => {
    return {
      _id: movie._id,
      genreId: movie.genre._id,
      title: movie.title,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  };
  render() {
    const { genres } = this.state;
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect(genres, "genreId", "Genre")}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate", "Number")}
          {this.renderSubmit("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
