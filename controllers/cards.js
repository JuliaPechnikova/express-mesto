const Card = require('../models/card');
const {ERROR_CODE, NOT_FOUND, UNDEFINED_ERROR} = require('../errors/error-const');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then(card => res.status(200).send(card))
    .catch(() => res.status(UNDEFINED_ERROR).send({ message: 'Ошибка по умолчанию' }));
}

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then(card => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError'){
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные при создании карточки' })}
      else {res.status(UNDEFINED_ERROR).send({ message: 'Ошибка по умолчанию' })}
    });
}

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => new NotFoundError('NotFoundError'))
    .then(card => res.status(200).send(card))
    .catch((err) => {
      if (err.message === 'NotFoundError'){
        res.status(ERROR_CODE).send({ message: 'Карточка с указанным _id не найдена' })}
      else {res.status(NOT_FOUND).send({ message: 'Карточка с указанным _id не найдена' })}});
}

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
  .orFail(() => new NotFoundError('NotFoundError'))
  .then(card => res.status(200).send(card))
  .catch((err) => {
    if (err.message === 'NotFoundError' || err.name === 'CastError'){
      res.status(NOT_FOUND).send({ message: 'Передан несуществующий _id карточки' })}
    else if (err.name === 'ValidationError'){
      res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные для постановки/снятии лайка' })}
    else {
      res.status(UNDEFINED_ERROR).send({ message: 'Ошибка по умолчанию' })}
    })
}

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
  .orFail(() => new NotFoundError('NotFoundError'))
  .then(card => res.status(200).send(card))
  .catch((err) => {
    if (err.message === 'NotFoundError' || err.name === 'CastError'){
      res.status(NOT_FOUND).send({ message: 'Передан несуществующий _id карточки' })}
    else if (err.name === 'ValidationError'){
      res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные для постановки/снятии лайка' })}
    else {
      res.status(UNDEFINED_ERROR).send({ message: 'Ошибка по умолчанию' })}
    })
}