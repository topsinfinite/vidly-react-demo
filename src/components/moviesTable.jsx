import React, { Component } from "react";
import Likes from "./common/like";
import TableHeader from "./common/tableHeader";

class MoviesTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    { key: "liked" },
    { key: "deleted" }
  ];
  render() {
    const { movies, sortColumn, onDelete, onSort, onLiked } = this.props;
    return (
      <table className="table">
        <TableHeader
          sortColumn={sortColumn}
          columns={this.columns}
          onSort={onSort}
        />

        <tbody>
          {movies.map(m => (
            <tr key={m._id}>
              <td>{m.title}</td>
              <td>{m.genre.name}</td>
              <td>{m.numberInStock}</td>
              <td>{m.dailyRentalRate}</td>
              <td>
                <Likes liked={m.liked} onClick={() => onLiked(m)} />
              </td>
              <td>
                <button
                  onClick={() => onDelete(m)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default MoviesTable;
