require('dotenv').config();
const rateLimit = require('express-rate-limit');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const errorProcess = require('./middlewares/error-process');

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

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post('/signin', login);
app.post('/signup', createUser);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(errorProcess);

app.use((req, res, next) => {
  res.status(404).send({ message: 'Запрос не найден' });
  next();
});

app.listen(PORT, () => {
});
