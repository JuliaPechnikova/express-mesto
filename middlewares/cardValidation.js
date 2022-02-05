const { celebrate, Joi } = require('celebrate');

module.exports.createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(true),
    link: Joi.string().pattern('(\b(https(?)://)?[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]').required(true),
  }),
});

module.exports.cardIdValidation = celebrate({
  body: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
});
