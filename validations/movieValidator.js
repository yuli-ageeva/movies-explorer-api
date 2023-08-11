const { celebrate, Joi } = require('celebrate');

const movieRegex = /^(http|https):\/\/(?:www\.)?[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]+(?:#.+)?$/;

const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(movieRegex),
    trailerLink: Joi.string().required().regex(movieRegex),
    thumbnail: Joi.string().required().regex(movieRegex),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const validateDeleteMovie = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  validateCreateMovie,
  validateDeleteMovie,
};
