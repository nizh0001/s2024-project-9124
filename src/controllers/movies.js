const moviesService = require("../services/movies");

const generateImageUrl = (path, size) => {
  const base_url = "https://image.tmdb.org/t/p/";
  return base_url + size + path;
};

const SmallPoster = "w92";
const largePoster = "w780";

const getAll = (req, res, next) => {
  const keyword = req.query.keyword;
  const sort = req.query.sort;

  try {
    let movies = [];

    if (sort === "popularity") {
      movies = moviesService.getByPopularity(keyword);
    } else if (sort === "release-date") {
      movies = moviesService.getByReleaseDate(keyword);
    } else if (sort === "vote") {
      movies = moviesService.getByVotes(keyword);
    }

    const sortedMovies = movies.map((movie) => ({
      id: movie.id,
      title: movie.title,
      imageUrl: generateImageUrl(movie.poster_path, SmallPoster),
    }));

    res.json({ data: sortedMovies });
  } catch (err) {
    next(err);
  }
};

const getOne = (req, res, next) => {
  try {
    const id = req.params.id;
    const movie = moviesService.getById(id);
    movie.imageUrl = generateImageUrl(movie.poster_path, largePoster);

    res.json({ data: movie });
  } catch (err) {
    next(err);
  }
};

const getAllFavorites = (req, res, next) => {
  try {
    const movies = moviesService.getFavorites();
    res.json({ data: movies });
  } catch (err) {
    next(err);
  }
};

const addFavoriteMovie = (req, res, next) => {
  try {
    const id = req.params.id;
    const movie = moviesService.addFavorite(id);
    res.json({ data: movie });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  getOne,
  getAllFavorites,
  addFavoriteMovie,
};
