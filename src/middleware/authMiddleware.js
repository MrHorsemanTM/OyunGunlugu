module.exports = (req, res, next) => {
    // app.js'de kurduğumuz session yapısında userId var mı diye bakıyoruz
    if (req.session && req.session.userId) {
        // Kullanıcı giriş yapmış, istek yoluna devam edebilir
        return next();
    } else {
        // Kullanıcı giriş yapmamış, yetkisiz hatası dönüyoruz
        return res.status(401).json({
            success: false,
            message: 'Bu işlemi gerçekleştirmek için giriş yapmalısınız.'
        });
    }
};