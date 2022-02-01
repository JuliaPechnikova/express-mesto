const jwt = require('jsonwebtoken');
const UnathorizedError = require('../errors/unathorized');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  let payload;
  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(req.cookies.jwt, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    // отправим ошибку, если не получилось
    next(new UnathorizedError('Вы не авторизованы'));
  }

  req.user = payload;
  next();
};
