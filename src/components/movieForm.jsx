import React, { Component } from "react";
import Form from "./common/form";
class MovieForm extends Form {
  state = {
    data: { title: "", genre: "", stock: "", rate: "" },
    errors: {}
  };
  schema = {
    title: Joi.string()
      .required()
      .label("Title"),
    genre: Joi.string()
      .required()
      .label("Genre"),
    stock: Joi.number()
      .min(0)
      .max(100)
      .label("Number in stock")
      .required(),
    rate: Joi.number()
      .min(1)
      .max(10)
  };
  handleSave = () => {
    this.props.history.push("/movies");
  };
  render() {
    const { match } = this.props;
    return (
      <div>
        <h1>Movie Form</h1>

        <button onClick={this.handleSave} className="btn btn-primary">
          Save
        </button>
      </div>
    );
  }
}

export default MovieForm;
