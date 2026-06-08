const Game = require('../models/Game');

const gameService = {
  // 1. Sadece giriş yapan kullanıcının oyunlarını listeler
  async getAllGames(userId) {
    return await Game.findAll({
      where: { userId: userId } // Veri izolasyonu filtresi
    });
  },

  // 2. Oyunu eklerken otomatik olarak sahibinin ID'sini de kaydeder
  async createGame(gameData) {
    // Rozet sistemi 0-5 puan arasında olduğu için validasyonu güncelledik:
    if (gameData.rating < 0 || gameData.rating > 5) {
      throw new Error('Rozet puanı 0-5 arasında olmalıdır.');
    }
    // gameData artık { title, genre, rating, status, summary, userId } yapısını tam destekliyor
    return await Game.create(gameData);
  },

  // 3. Güvenlik Duvarı: Kullanıcının sadece KENDİ oyununu silmesini sağlar
  async deleteGame(id, userId) {
    // Hem oyunun ID'sini hem de işlemi yapan kullanıcının ID'sini kontrol ediyoruz
    const game = await Game.findOne({
      where: {
        id: id,
        userId: userId
      }
    });

    if (!game) {
      throw new Error('Oyun bulunamadı veya bu oyunu silme yetkiniz yok.');
    }
    
    return await game.destroy();
  }
};

module.exports = gameService;