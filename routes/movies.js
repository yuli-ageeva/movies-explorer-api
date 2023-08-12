const express = require('express');

const router = express.Router();
const movieController = require('../controllers/movies');
const { validateCreateMovie, validateDeleteMovie } = require('../validations/movieValidator');

router.get('/', movieController.getMovies);
router.post('/', validateCreateMovie, movieController.createMovie);
router.delete('/:_id', validateDeleteMovie, movieController.deleteMovie);

module.exports = router;
