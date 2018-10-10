import React, { Component } from "react";
import Form from "./common/form";
class MovieForm extends Form {
  state = {
    data: { title: "", genre: "", stock: "", rate: "" },
    errors: {}
  };
  handleSave = () => {
    this.props.history.push("/movies");
  };
  render() {
    const { match } = this.props;
    return (
      <div>
        <h1>Movie Form</h1>
        {}
        <button onClick={this.handleSave} className="btn btn-primary">
          Save
        </button>
      </div>
    );
  }
}

export default MovieForm;
