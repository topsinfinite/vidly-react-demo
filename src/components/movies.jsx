import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import { Paginate } from "../utils/paginate";
import MovieGenre from "./common/movie-genre";
import _ from "lodash";
import SearchInput from "./common/searchInput";

class Movies extends Component {
  state = {
    movies: [],
    genreList: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
    searchText: "",
    selectedGenre: null
  };
  async componentDidMount() {
    const { data } = await getGenres();
    const { data: movies } = await getMovies();
    const genreList = [{ _id: "", name: "All Genres" }, ...data];

    this.setState({ movies, genreList });
  }
  handleDelete = async movie => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter(m => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("This movie has already been deleted");
        this.setState({ movies: originalMovies });
      }
    }
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
    this.setState({ selectedGenre: genre, currentPage: 1, searchText: "" });
  };
  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };
  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      movies: allMovies,
      selectedGenre,
      searchText
    } = this.state;

    const filtered = this.handleFiltering(selectedGenre, searchText, allMovies);
    const ordered = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = Paginate(ordered, currentPage, pageSize);
    return { totalCount: filtered.length, movies: movies };
  };
  handleFiltering = (selectedGenre, searchText, allMovies) => {
    if (selectedGenre && selectedGenre._id) {
      return allMovies.filter(m => m.genre._id === selectedGenre._id);
    }
    if (searchText) {
      return allMovies.filter(m => {
        return m.title.toUpperCase().indexOf(searchText.toUpperCase()) !== -1;
      });
    }
    return allMovies;
  };
  handleSearch = query => {
    this.setState({
      searchText: query,
      selectedGenre: null,
      currentPage: 1
    });
  };
  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      sortColumn,
      genreList,
      selectedGenre
    } = this.state;
    const { totalCount, movies } = this.getPagedData();
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
          <NavLink className="btn btn-primary" to="/movies/new" role="button">
            New Movie
          </NavLink>
          <p>Showing {totalCount} movies in the database.</p>
          <SearchInput
            name="search"
            placeholder="Search..."
            value={this.state.searchText}
            onChange={this.handleSearch}
          />
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onLiked={this.handleLike}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
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
