import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres, getGenresById } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import { Paginate } from "../utils/paginate";
import MovieGenre from "./common/movie-genre";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genreList: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" }
  };
  componentDidMount() {
    const movies = getMovies();
    const genreList = [{ _id: "", name: "All Genres" }, ...getGenres()];

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
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };
  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };
  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      sortColumn,
      movies: allMovies,
      genreList,
      selectedGenre
    } = this.state;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies;
    const ordered = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = Paginate(ordered, currentPage, pageSize);
    if (count === 0) return <p>No movie in the database</p>;
    return (
      <div className="row">
        <div className="col-3">
          <MovieGenre
            selectedGenre={selectedGenre}
            genreItems={genreList}
            onGenreChange={this.handleGenreChange}
          />
        </div>
        <div className="col">
          <p>Showing {filtered.length} movies in the database.</p>
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onLiked={this.handleLike}
            onSort={this.handleSort}
          />
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
