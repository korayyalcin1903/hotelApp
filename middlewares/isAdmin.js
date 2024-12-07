module.exports = (req, res, next) => {
    console.log(req.session)
    if(!req.session.isAuth){
        return res.redirect('/auth/login')
    }

    if(!req.session.isAdmin){
        req.session.message = {text: 'Yetkili bir kullanıcı ile oturum açınız.'}
        return res.redirect('/auth/login')
    }
    next()
}