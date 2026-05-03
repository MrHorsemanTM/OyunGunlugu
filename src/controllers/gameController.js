const gameService = require('../services/gameService');

const gameController = {
  async getAll(req, res) {
    try {
      const games = await gameService.getAllGames();
      res.json(games); // Başarılıysa 200 döner
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async create(req, res) {
    try {
      const newGame = await gameService.createGame(req.body);
      res.status(201).json(newGame); // Yeni kaynak oluşturulduğunda 201
    } catch (error) {
      res.status(400).json({ message: error.message }); // Hatalı istekte 400
    }
  },

  async delete(req, res) {
    try {
      await gameService.deleteGame(req.params.id);
      res.status(204).send(); // İçerik yok (silme başarılı) durum kodu
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
};

module.exports = gameController;