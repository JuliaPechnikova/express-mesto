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
    avatar: Joi.string().pattern(/^(https?:\/\/)(www.)?[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(\/\S*)?$/),
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
    avatar: Joi.string().required(true).pattern(/^(https?:\/\/)(www.)?[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(\/\S*)?$/),
  }),
});

module.exports.userIdValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex(),
  }),
});
