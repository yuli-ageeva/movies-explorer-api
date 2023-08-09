const express = require('express');

const router = express.Router();
const movieController = require('../controllers/movies');
const { validateCreateMovie, validateMovieId } = require('../utils/movieValidator');

router.get('/', movieController.getMovies);
router.post('/', validateCreateMovie, movieController.createMovie);
router.delete('/:movieId', validateMovieId, movieController.deleteMovie);

module.exports = router;
