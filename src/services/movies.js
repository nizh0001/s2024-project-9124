const movies = require("../models/movies");
const { NotFoundError } = require("../utils/errors");

const favoriteMovies = [];

const getByPopularity = (keyword) => {
  const moviesList = movies.filter((movie) =>
    movie.title.toLowerCase().includes(keyword.toLowerCase())
  );
  return moviesList.sort((a, b) => b.popularity - a.popularity).slice(0, 10);
};

const getByVotes = (keyword) => {
  const moviesList = movies.filter((movie) =>
    movie.title.toLowerCase().includes(keyword.toLowerCase())
  );
  return moviesList
    .sort((a, b) => b.vote_average - a.vote_average)
    .slice(0, 10);
};

const getByReleaseDate = (keyword) => {
  const moviesList = movies.filter((movie) =>
    movie.title.toLowerCase().includes(keyword.toLowerCase())
  );
  return moviesList
    .sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
    .slice(0, 10);
};

const getById = (id) => {
  const selectedMovie = movies.find((movie) => movie.id === Number(id));
  if (!selectedMovie) {
    throw new NotFoundError(`Movie with id ${id} is not found`);
  }
  return selectedMovie;
};

const getFavorites = () => {
  return favoriteMovies;
};

const addFavorite = (id) => {
  const movie = movies.find((movie) => movie.id === Number(id));

  if (!movie) {
    throw new NotFoundError(`Movie with id ${id} is not found`);
  }

  if (!favoriteMovies.some((movie) => movie.id === Number(id))) {
    favoriteMovies.push(movie);
  }

  return movie;
};

module.exports = {
  getByPopularity,
  getByVotes,
  getByReleaseDate,
  getById,
  getFavorites,
  addFavorite,
};
