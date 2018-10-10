import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import SelectInput from "./common/select";
import { getGenres } from "../services/fakeGenreService";
import { saveMovie } from "../services/fakeMovieService";

class MovieForm extends Form {
  state = {
    data: { title: "", numberInStock: "", dailyRentalRate: "" },
    selectedGenre: "",
    movieGenre: [],
    errors: {}
  };
  schema = {
    title: Joi.string()
      .required()
      .label("Title"),
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
    const movieGenre = getGenres();
    this.setState({ movieGenre, selectedGenre: "5b21ca3eeb7f6fbccd471818" });
  }
  handleSelect = e => {
    this.setState({ selectedGenre: e.target.value });
    //console.log(this.state.selectedGenre);
  };
  doSubmit = () => {
    const { data: movie } = this.state;
    movie.genreId = this.state.selectedGenre;
    console.log(movie);
    saveMovie(movie);
    this.props.history.push("/movies");
  };
  render() {
    const { movieGenre, selectedGenre } = this.state;
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          <SelectInput
            dataList={movieGenre}
            name="genre"
            label="Genre"
            selectedValue={selectedGenre}
            onSelect={this.handleSelect}
          />
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate", "Number")}
          {this.renderSubmit("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
