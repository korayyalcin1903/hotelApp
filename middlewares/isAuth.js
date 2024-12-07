module.exports = (req, res, next) => {
    console.log(req.session)
    if(!req.session.isAuth){
        return res.redirect('/auth/login')
    }
    next()
}