import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getGenres } from "../services/fakeGenreService";
import { saveMovie, getMovie } from "../services/fakeMovieService";

class MovieForm extends Form {
  state = {
    data: { title: "", genre: "", numberInStock: "", dailyRentalRate: "" },
    selectData: [],
    errors: {}
  };
  schema = {
    title: Joi.string()
      .required()
      .label("Title"),
    genre: Joi.string(),
    _id: Joi.string(),
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
    const selectData = getGenres();
    const { match } = this.props;
    const { data } = this.state;
    this.setState({ selectData });
    if (match.params.id) {
      const movie = getMovie(match.params.id);
      if (movie) {
        data._id = movie._id;
        data.genre = movie.genre._id;
        data.title = movie.title;
        data.numberInStock = movie.numberInStock;
        data.dailyRentalRate = movie.dailyRentalRate;
        this.setState({ data });
      } else {
        this.props.history.push("/notfound");
      }
    } else {
      data.genre = "5b21ca3eeb7f6fbccd471818";
      this.setState({ data });
    }
  }
  handleSelect = e => {
    const { data } = this.state;
    data.genre = e.target.value;
    this.setState({ data });
  };
  doSubmit = () => {
    const { data: movie } = this.state;
    movie.genreId = movie.genre;
    saveMovie(movie);
    this.props.history.push("/movies");
  };
  render() {
    const { selectData, data } = this.state;
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect(
            selectData,
            data.genre,
            "genre",
            "Genre",
            this.handleSelect
          )}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate", "Number")}
          {this.renderSubmit("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
