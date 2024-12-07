const { verifyToken } = require('../middlewares/authentication');

exports.index = async (req, res) => {
    return res.render('home/', {
        title: 'Anasayfa',
    });
};
