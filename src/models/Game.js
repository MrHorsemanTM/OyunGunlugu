const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Game = sequelize.define('Game', {
  title: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  genre: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.ENUM('İstek Listesi', 'Oynanıyor', 'Tamamlandı'),
    defaultValue: 'İstek Listesi'
  },
  rating: {
    type: DataTypes.INTEGER,
    validate: { min: 0, max: 10 }
  }
});

module.exports = Game;