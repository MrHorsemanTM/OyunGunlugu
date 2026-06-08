const authService = require('../services/authService');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Şifre kontrolü için modeli ekledik

// 1. KULLANICI KAYIT (POST /api/auth/register)
exports.postRegister = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const newUser = await authService.registerUser(username, email, password);
        
        // API formatına uygun JSON yanıtı
        res.status(201).json({
            success: true,
            message: 'Kullanıcı başarıyla kaydedildi.',
            data: { 
                id: newUser.id, 
                username: newUser.username, 
                email: newUser.email 
            }
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// 2. KULLANICI GİRİŞİ (POST /api/auth/login)
exports.postLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Kullanıcıyı e-posta adresine göre veritabanında ara
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ success: false, message: 'Hatalı e-posta veya şifre.' });
        }

        // İstekle gelen şifre ile veritabanındaki hash'lenmiş şifreyi karşılaştır
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Hatalı e-posta veya şifre.' });
        }

        // Şifre doğruysa session (oturum) içine kullanıcı bilgilerini kaydet
        req.session.userId = user.id;
        req.session.username = user.username;

        res.status(200).json({
            success: true,
            message: 'Giriş başarılı.',
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Giriş işlemi sırasında bir hata oluştu.'
        });
    }
};

// 3. KULLANICI ÇIKIŞI (POST /api/auth/logout)
exports.postLogout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Çıkış yapılırken bir hata oluştu.' });
        }
        res.clearCookie('connect.sid'); // Session çerezini tarayıcıdan temizle
        res.status(200).json({ success: true, message: 'Başarıyla çıkış yapıldı.' });
    });
};