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
    // Veritabanı seviyesinde İngilizce ve standart karakterler kullanıyoruz
    type: DataTypes.ENUM('dropped', 'plan-to-play', 'completed'),
    defaultValue: 'plan-to-play'
  },
  rating: {
    type: DataTypes.INTEGER,
    validate: { min: 0, max: 5 }
  },
  summary: {
    type: DataTypes.TEXT,
    allowNull: true
  }
});

module.exports = Game;