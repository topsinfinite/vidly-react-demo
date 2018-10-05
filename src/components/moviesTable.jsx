import React, { Component } from "react";
import Likes from "./common/like";
import Table from "./common/table";

class MoviesTable extends Component {
  columns = [
    { path: "title", label: "Title", linkto: true },
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
