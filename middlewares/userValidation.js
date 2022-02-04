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
    avatar: Joi.string().default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'),
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
    avatar: Joi.string().required(true),
  }),
});
