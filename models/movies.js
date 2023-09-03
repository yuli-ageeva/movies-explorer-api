const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: 'String',
      required: true,
    },
    director: {
      type: 'String',
      required: true,
    },
    duration: {
      type: 'Number',
      required: true,
    },
    year: {
      type: 'String',
      required: true,
    },
    description: {
      type: 'String',
      required: true,
    },
    image: {
      type: 'String',
      required: true,
      validate: {
        validator: (value) => validator.isURL(value),
      },
    },
    trailerLink: {
      type: 'String',
      required: true,
      validate: {
        validator: (value) => validator.isURL(value),
      },
    },
    thumbnail: {
      type: 'String',
      required: true,
      validate: {
        validator: (value) => validator.isURL(value),
      },
    },
    owner: {
      type: 'ObjectId',
      required: true,
    },
    movieId: {
      type: 'Number',
      required: true,
      unique: true,
    },
    nameRU: {
      type: 'String',
      required: true,
    },
    nameEN: {
      type: 'String',
      required: true,
    },
  },
);

const Movie = mongoose.model('movie', movieSchema);
module.exports = {
  Movie,
};
