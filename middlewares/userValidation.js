const { celebrate, Joi } = require('celebrate');

module.exports.loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(true),
    password: Joi.string().required(true),
  }),
});

module.exports.createUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).default('Жак-Ив Кусто'),
    about: Joi.string().min(2).max(30).default('Исследователь'),
    avatar: Joi.string().pattern('(\b(https(?)://)?[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]'),
    email: Joi.string().required(true),
    password: Joi.string().required(true),
  }),
});

module.exports.updateUserInfoValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(true),
    about: Joi.string().min(2).max(30).required(true),
  }),
});

module.exports.updateUserAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required(true).pattern('(\b(https(?)://)?[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]'),
  }),
});

module.exports.userIdValidation = celebrate({
  body: Joi.object().keys({
    userId: Joi.string().length(24).hex(),
  }),
});
