import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres, getGenresById } from "../services/fakeGenreService";
import Likes from "./common/like";
import Pagination from "./common/pagination";
import { Paginate } from "../utils/paginate";
import MovieGenre from "./common/movie-genre";

class Movies extends Component {
  state = {
    movies: [],
    genreList: [],
    pageSize: 4,
    currentPage: 1
  };
  componentDidMount() {
    const movies = getMovies();
    const genreList = getGenres();
    this.setState({ movies, genreList });
  }
  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };
  handleLike = movie => {
    const movies = [...this.state.movies];
    const idx = movies.indexOf(movie);
    movies[idx] = { ...movies[idx] };
    movies[idx].liked = !movies[idx].liked;
    this.setState({ movies });
  };
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };
  handleGenreChange = genre => {
    this.setState({ selectGenre: genre });
  };
  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      genreList,
      selectGenre
    } = this.state;

    const filtered = selectGenre
      ? allMovies.filter(m => m.genre._id === selectGenre._id)
      : allMovies;
    const movies = Paginate(filtered, currentPage, pageSize);
    if (count === 0) return <p>No movie in the database</p>;
    return (
      <div className="row">
        <div className="col-2">
          <MovieGenre
            selectGenre={selectGenre}
            genreItems={genreList}
            onGenreChange={this.handleGenreChange}
          />
        </div>
        <div className="col">
          <p>Showing {filtered.length} movies in the database.</p>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Genre</th>
                <th scope="col">Stock</th>
                <th scope="col">Rate</th>
                <th scope="col" />
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              {movies.map(m => (
                <tr key={m._id}>
                  <td>{m.title}</td>
                  <td>{m.genre.name}</td>
                  <td>{m.numberInStock}</td>
                  <td>{m.dailyRentalRate}</td>
                  <td>
                    <Likes liked={m.liked} onClick={() => this.handleLike(m)} />
                  </td>
                  <td>
                    <button
                      onClick={() => this.handleDelete(m)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            itemsCount={filtered.length}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
