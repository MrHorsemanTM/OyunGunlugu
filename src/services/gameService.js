const Game = require('../models/Game');

const gameService = {
  async getAllGames() {
    return await Game.findAll();
  },

  async createGame(gameData) {
    // İş mantığı kuralı
    if (gameData.rating < 0 || gameData.rating > 10) {
      throw new Error('Puan 0-10 arasında olmalıdır.');
    }
    return await Game.create(gameData);
  },

  async deleteGame(id) {
    const game = await Game.findByPk(id);
    if (!game) throw new Error('Oyun bulunamadı.');
    return await game.destroy();
  }
};

module.exports = gameService;