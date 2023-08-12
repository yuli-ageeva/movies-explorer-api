const { Movie } = require('../models/movies');
const NotFoundError = require('../errors/NotFoundError');
const RequestError = require('../errors/RequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const {
  movieCreationErrorMessage,
  movieNotFoundErrorMessage,
  movieDeleteForbiddenErrorMessage,
  movieDeleteErrorMessage,
} = require('../constants');

function getMovies(req, res, next) {
  Movie.find({ owner: req.user._id }).sort({ createdAt: -1 })
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
}

function createMovie(req, res, next) {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new RequestError(movieCreationErrorMessage));
      }
      return next(err);
    });
}

function deleteMovie(req, res, next) {
  const id = req.params._id;
  const userId = req.user._id;

  Movie.findById(id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(movieNotFoundErrorMessage);
      }

      if (movie.owner.toString() !== userId) {
        throw new ForbiddenError(movieDeleteForbiddenErrorMessage);
      }
      return Movie.findByIdAndRemove(id);
    })
    .then((deletedMovie) => {
      res.send(deletedMovie);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new RequestError(movieDeleteErrorMessage));
      }
      return next(err);
    });
}

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
