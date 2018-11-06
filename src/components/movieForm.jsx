import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getGenres } from "../services/genreService";
import { saveMovie, getMovie } from "../services/movieService";
import { toast } from "react-toastify";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    genres: [],
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
  populateGenre = async () => {
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...data];
    this.setState({ genres });
  };
  async populateMovie() {
    const movieId = this.props.match.params.id;
    if (movieId === "new") return;
    try {
      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapMovieToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        return this.props.history.push("/notfound");
    }
  }
  async componentDidMount() {
    await this.populateGenre();
    await this.populateMovie();
  }
  doSubmit = async () => {
    const { data: movie } = this.state;
    try {
      await saveMovie(movie);
      this.props.history.push("/movies");
    } catch (ex) {
      toast.error("An error occurred...");
    }
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
