const rateLimit = require('express-rate-limit');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const errorProcess = require('./middlewares/error-process');
const { loginValidation, createUserValidation } = require('./middlewares/userValidation');

const { PORT = 3002 } = process.env;
const app = express();

// Ограничиваем кол-во запросов от пользователей
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
});

app.use(limiter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const {
  login,
  createUser,
} = require('./controllers/users');
const NotFoundError = require('./errors/not-found');
const auth = require('./middlewares/auth');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post('/signin', loginValidation, login);
app.post('/signup', createUserValidation, createUser);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use(auth, (req, res, next) => {
  next(new NotFoundError('Запрос не найден'));
});

app.use(errors());
app.use(errorProcess);

app.listen(PORT, () => {
});
