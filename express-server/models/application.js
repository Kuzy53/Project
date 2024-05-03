const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres'
});
const User = require('./user');

const Application = sequelize.define('Application', {
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  carNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('new', 'confirmed', 'rejected'),
    defaultValue: 'new'
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  }
});

module.exports = Application;
