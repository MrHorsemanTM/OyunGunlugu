const gameService = require('../services/gameService');

const gameController = {
  async getAll(req, res) {
    try {
      // Sadece oturum açmış kullanıcının ID'sini servis fonksiyonuna gönderiyoruz
      const userId = req.session.userId;
      const games = await gameService.getAllGames(userId);
      res.json(games); 
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async create(req, res) {
    try {
      // İstekten gelen oyun verilerinin yanına, oyunu ekleyen kullanıcının ID'sini de iliştiriyoruz
      const userId = req.session.userId;
      const gameData = { ...req.body, userId: userId };
      
      const newGame = await gameService.createGame(gameData);
      res.status(201).json(newGame); 
    } catch (error) {
      res.status(400).json({ message: error.message }); 
    }
  },

  async delete(req, res) {
    try {
      // Güvenlik için silme işleminde de kullanıcının sadece kendi oyununu silebilmesini sağlıyoruz
      const userId = req.session.userId;
      await gameService.deleteGame(req.params.id, userId);
      res.status(204).send(); 
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
};

module.exports = gameController;