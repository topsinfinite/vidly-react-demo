import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndPoint = apiUrl + "/movies";

export function getMovies() {
  return http.get(apiEndPoint);
}

export function deleteMovie(movieId) {
  return http.delete(apiEndPoint + "/" + movieId);
}

export function saveMovie(movie) {
  if (movie._id) {
    const movieUpdated = { ...movie };
    delete movieUpdated._id;
    return http.put(apiEndPoint + "/" + movie._id, movieUpdated);
  } else {
    return http.post(apiEndPoint, movie);
  }
}
export function getMovie(movieId) {
  return http.get(apiEndPoint + "/" + movieId);
}
