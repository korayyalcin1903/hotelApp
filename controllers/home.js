const { verifyToken } = require('../middlewares/authentication');

exports.index = [
    verifyToken, // Token doğrulama middleware'i
    (req, res) => {
        res.render('home/index', {
            title: 'Anasayfa',
            user: req.user, // Doğrulanan kullanıcı bilgileri
        });
    }
];
