const express = require('express');
const { Sequelize } = require('sequelize');
const usersRoutes = require('./routes/users');
var cors = require('cors')
const app = express();
app.use(express.json());
app.use(cors())

const sequelize = new Sequelize('postgres', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres'
});

sequelize.authenticate()
  .then(() => console.log('Успешное подключение к базе данных.'))
  .catch(err => console.error('Ошибка подключения к базе данных:', err));

app.use('/users', usersRoutes);

app.listen(3000, () => console.log('Сервер запущен на порту 3000.'));
