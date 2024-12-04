const express = require('express')
const app = express()

const path = require('path')

app.set('view engine', 'ejs')

const homeRoutes = require('./routers/home')
const authRoutes = require('./routers/auth')
const adminRoutes = require('./routers/admin')
const sequelize = require('./data/db')


app.use(express.urlencoded({extended: true}))
app.use('/', homeRoutes)
app.use('/auth', authRoutes)
app.use('/admin', adminRoutes)

app.use('/libs', express.static(path.join(__dirname, 'node_modules')))
app.use('/static', express.static(path.join(__dirname, 'public')))

const admin = require('./models/admin')
const customer = require('./models/customer')
const menu = require('./models/menu')
const order = require('./models/order')
const orderDetail = require('./models/orderDetail')

const relations = require('./models/relations')
const dummyData = require('./data/dummyData')
relations.relations()

async function data() {
    await sequelize.sync({force: false})
    await dummyData.dummyData()
}

data()

app.listen(3000, () => {
    console.log("listening on port 3000")
})