const { celebrate, Joi } = require('celebrate');

module.exports.createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(true),
    link: Joi.string().pattern(/^(https?:\/\/)(www.)?[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(\/\S*)?$/).required(true),
  }),
});

module.exports.cardIdValidation = celebrate({
  body: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
});
