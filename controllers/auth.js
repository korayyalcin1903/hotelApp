exports.get_login = (req, res) => {
    res.render('auth/login', {
        title: 'Login'
    })
}

exports.get_register = (req, res) => {
    res.render('auth/register', {
        title: 'Register'
    })
}