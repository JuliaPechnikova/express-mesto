const NotFoundError = require('../errors/not-found');
const User = require('../models/user');
const {ERROR_CODE, NOT_FOUND, UNDEFINED_ERROR} = require('../errors/error-const');

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => new NotFoundError('NotFoundError'))
    .then(user => res.status(200).send(user))
    .catch((err) => {
      console.log(err.name);
      if (err.name === 'CastError' || err.message === 'NotFoundError'){
        res.status(NOT_FOUND).send({ message: 'Пользователь по указанному _id не найден'})}
      else {
        res.status(UNDEFINED_ERROR).send({ message: 'Ошибка по умолчанию' })}
    })
}

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(user => res.send(user))
    .catch(() => res.status(UNDEFINED_ERROR).send({ message: 'Ошибка по умолчанию' }));
}

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError'){
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные при создании пользователя' })}
      else {
        res.status(UNDEFINED_ERROR).send({ message: 'Ошибка по умолчанию' })}
    })
}

module.exports.updateUserInfo = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true, // обработчик then получит на вход обновлённую запись
    //runValidators: true // данные будут валидированы перед изменением
  })
    .orFail(() => new NotFoundError('NotFoundError'))
    .then(user => res.status(200).send(user))
    .catch((err) =>
      {
        if (err.name === 'ValidationError'){
          res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные при обновлении профиля' })}
        else if (err.message === 'NotFoundError'){
          res.status(NOT_FOUND).send({ message: 'Пользователь с указанным _id не найден' })}
        else {
          res.status(UNDEFINED_ERROR).send({ message: 'Ошибка по умолчанию' })}
      })
}

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true, // обработчик then получит на вход обновлённую запись
    runValidators: true // данные будут валидированы перед изменением
  })
    .orFail(() => new NotFoundError('NotFoundError'))
    .then(user => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError'){
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные при обновлении аватара' })}
      else if (err.message === 'NotFoundError'){
        res.status(NOT_FOUND).send({ message: 'Пользователь с указанным _id не найден' })}
      else {
        res.status(UNDEFINED_ERROR).send({ message: 'Ошибка по умолчанию' })}
    });
}