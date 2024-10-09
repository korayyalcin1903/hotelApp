const express = require('express')
const app = express()

const path = require('path')

app.set('view engine', 'ejs')

const homeRoutes = require('./routers/home')
const authRoutes = require('./routers/auth')


app.use(express.urlencoded({extended: true}))
app.use('/', homeRoutes)
app.use('/auth', authRoutes)

app.use('/libs', express.static(path.join(__dirname, 'node_modules')))
app.use('/static', express.static(path.join(__dirname, 'public')))

app.listen(3000, () => {
    console.log("listening on port 3000")
})