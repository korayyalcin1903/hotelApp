exports.get_login = (req, res) => {
    res.render('auth/login', {
        title: 'Login'
    })
}