const loginErrorMessage = 'Вы ввели неправильный логин или пароль.';
const userAlreadyExistsErrorMessage = 'Пользователь с таким email уже существует.';
const userNotFoundErrorMessage = 'Пользователь не найден.';
const userCreationErrorMessage = 'При регистрации пользователя произошла ошибка.';
const getUserErrorMessage = 'При загрузке профиля произошла ошибка.';
const updateUserErrorMessage = 'При обновлении профиля произошла ошибка.';

const movieCreationErrorMessage = 'При создании карточки произошла ошибка.';
const movieNotFoundErrorMessage = 'Карточка не найдена';
const movieDeleteForbiddenErrorMessage = 'У вас нет прав на удаление этой карточки';
const movieDeleteErrorMessage = 'Передано некорректное id карточки';
const pageNotFoundErrorMessage = 'Страница по указанному маршруту не найдена.';
const internalErrorMessage = 'На сервере произошла ошибка';

const saltRounds = 10;

module.exports = {
  loginErrorMessage,
  userAlreadyExistsErrorMessage,
  userNotFoundErrorMessage,
  userCreationErrorMessage,
  getUserErrorMessage,
  updateUserErrorMessage,
  movieCreationErrorMessage,
  movieNotFoundErrorMessage,
  movieDeleteForbiddenErrorMessage,
  movieDeleteErrorMessage,
  pageNotFoundErrorMessage,
  internalErrorMessage,
  saltRounds,
};
