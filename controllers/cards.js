const Card = require('../models/card');
const NotFoundError = require('../errors/not-found');
const BadRequestError = require('../errors/unathorized');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.status(200).send(card))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании карточки'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => new NotFoundError('NotFoundError'))
    .then((cardOwner) => {
      if (cardOwner.owner.equals(req.user._id)) {
        Card.findByIdAndRemove(req.params.cardId)
          .orFail(() => new NotFoundError('NotFoundError'))
          .then((card) => res.status(200).send(card))
          .catch((err) => {
            if (err.message === 'NotFoundError') {
              next(new NotFoundError('Карточка с указанным _id не найдена'));
            } if (err.name === 'CastError') {
              next(new BadRequestError('Невалидный id'));
            } else {
              next(err);
            }
          });
      } else {
        next(new BadRequestError('Удаление карточек других пользователей запрещено'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Невалидный id'));
      } else if (err.message === 'NotFoundError') {
        next(new NotFoundError('Карточка с указанным _id не найдена'));
      } else {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(() => new NotFoundError('NotFoundError'))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.message === 'NotFoundError') {
        next(new NotFoundError('Передан несуществующий _id карточки'));
      } else if (err.name === 'CastError') {
        next(new BadRequestError('Невалидный id'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные для постановки лайка'));
      } else {
        next(err);
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(() => new NotFoundError('NotFoundError'))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.message === 'NotFoundError') {
        next(new NotFoundError('Передан несуществующий _id карточки'));
      } else if (err.name === 'CastError') {
        next(new BadRequestError('Невалидный id'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные для снятии лайка'));
      } else {
        next(err);
      }
    });
};
