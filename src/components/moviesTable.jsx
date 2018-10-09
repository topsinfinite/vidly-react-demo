import React, { Component } from "react";
import { Link } from "react-router-dom";
import Likes from "./common/like";
import Table from "./common/table";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: m => <Link to={`/movies/${m._id}`}>{m.title}</Link>
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "liked",
      content: m => (
        <Likes liked={m.liked} onClick={() => this.props.onLiked(m)} />
      )
    },
    {
      key: "deleted",
      content: m => (
        <button
          onClick={() => this.props.onDelete(m)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      )
    }
  ];
  render() {
    const { movies, sortColumn, onSort } = this.props;
    return (
      <Table
        data={movies}
        sortColumn={sortColumn}
        columns={this.columns}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
