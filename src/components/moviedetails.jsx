import React, { Component } from "react";
import Movies from "./movies";
class MoviesDetails extends Component {
  handleSave = () => {
    this.props.history.push("/movies");
  };
  render() {
    const { match } = this.props;
    return (
      <div>
        <h1>Movie Form {match.params.id}</h1>
        <button onClick={this.handleSave} className="btn btn-primary btn-sm">
          Save
        </button>
      </div>
    );
  }
}

export default MoviesDetails;
