const sequelize = require('../data/db')
const User = require('../models/customer');
const { generateToken } = require('../middlewares/authentication');

// Login Sayfasını Göster
exports.get_login = (req, res) => {
    res.render('auth/login', {
        title: 'Login',
        message: null, // Hata mesajı boş olarak gönderilir
    });
};

// Login İşlemini Yap
exports.post_login = async (req, res) => {
    const { username, password } = req.body; // Formdan gelen username ve password

    try {
        // Kullanıcıyı veritabanında ara
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.render('auth/login', {
                title: 'Login',
                message: 'Kullanıcı bulunamadı.',
            });
        }

        // Şifre kontrolü
        if (user.password !== password) {
            return res.render('auth/login', {
                title: 'Login',
                message: 'Şifre hatalı.',
            });
        }

        // JWT token oluştur
        const token = generateToken(user);

        req.session.isAuth = true; 
        req.session.isAdmin = user.isAdmin; 
        req.session.username = user.username;
        req.session.name = user.name;
        req.session.roomNumber = user.roomNumber;
        req.session.userid = user.id;
        req.session.token = token;

        if(req.session.isAdmin){
            return res.redirect('/admin/order')
        } else {
            return res.render('home/', {
                message: "test",
                title: "Home",
                name: req.session.name,
                roomNumber: req.session.roomNumber,
                userid: req.session.userid 
            });
        }

    } catch (error) {
        console.error('Giriş sırasında bir hata oluştu:', error);
        res.status(500).json({ error: 'Bir hata oluştu.' });
    }
};

// Register Sayfasını Göster
exports.get_register = (req, res) => {
    res.render('auth/register', {
        title: 'Register',
        message: null, // Hata mesajı boş olarak gönderilir
    });
};

// Yeni Kullanıcı Kaydı Yap
exports.post_register = async (req, res) => {
    const { username, password, name, roomNumber, phone } = req.body; // Formdan gelen veriler

    try {
        // Kullanıcının zaten kayıtlı olup olmadığını kontrol et
        const existingUser = await User.findOne({ where: { username } });

        if (existingUser) {
            return res.render('auth/register', {
                title: 'Register',
                message: 'Bu kullanıcı adı zaten alınmış.',
            });
        }

        // Yeni kullanıcı oluştur
        const newUser = await User.create({
            username,
            password, // Şifre düz metin olarak alınır
            name,
            roomNumber,
            phone,
        });

        // Başarılı kayıt sonrası token oluştur ve döndür
        const token = generateToken(newUser);

        return res.redirect('/auth/login');
    } catch (error) {
        console.error('Kayıt sırasında bir hata oluştu:', error);
        res.status(500).json({ error: 'Bir hata oluştu. Lütfen tekrar deneyin.' });
    }
};

exports.get_logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Session temizlenirken bir hata oluştu:', err);
            return res.status(500).send('Bir hata oluştu.');
        }
        
        res.redirect('/auth/login');
    });
};