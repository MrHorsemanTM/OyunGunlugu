const bcrypt = require('bcryptjs');
const User = require('../models/User');

class AuthService {
    // Yeni kullanıcı kaydı oluşturma fonksiyonu
    async registerUser(username, email, password) {
        try {
            // 1. E-posta veya kullanıcı adı zaten var mı kontrol et
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                throw new Error('Bu e-posta adresi zaten kullanımda.');
            }

            // 2. Şifreyi güvenli bir şekilde hash'le
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // 3. Veritabanına kaydet
            const newUser = await User.create({
                username,
                email,
                password: hashedPassword
            });

            return newUser;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new AuthService();