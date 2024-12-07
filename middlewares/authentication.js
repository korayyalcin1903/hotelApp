const jwt = require('jsonwebtoken');
const User = require('../models/customer'); // Kullanıcı modelini ekliyoruz

// JWT oluşturmak için kullanılan gizli anahtar
const SECRET_KEY = 'jwt_password_123456'; // Güçlü bir gizli anahtar belirleyin

// 1) JWT oluşturma
exports.generateToken = (user) => {
    const payload = {
        id: user.id,
        name:user.name,
        username: user.username,
        roomNumber:user.roomNumber,
        phone:user.phone,
        isAdmin: user.isAdmin

    };

    // Token oluştur (süresiz)
    return jwt.sign(payload, SECRET_KEY);
};

// 2) JWT kontrol etme (Middleware)
exports.verifyToken = async (req, res, next) => {
    const token = req.session.token

    if (!token) {
        return res.redirect('/auth/login'); // Token eksikse yönlendir
    }

    try {
        // Token doğrula
        const decoded = jwt.verify(token, SECRET_KEY);

        // Kullanıcıyı veritabanında kontrol et
        const user = await User.findByPk(decoded.id);
        if (!user) {
            return res.redirect('/auth/login'); // Kullanıcı bulunamadıysa yönlendir
        }

        // Kullanıcıyı request'e ekle ve devam et
        req.user = user;
        next();
    } catch (error) {
        console.log('JWT kontrolü sırasında hata:', error);
        return res.redirect('/auth/login'); // Token geçersizse yönlendir
    }
};

