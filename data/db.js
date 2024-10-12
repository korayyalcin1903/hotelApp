const config = require('../config')

const Sequelize = require('sequelize')

const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
    dialect: 'mysql',
    host: config.db.host,
    storage: './session.mysql'
})

async function connect() {
    try {
        await sequelize.authenticate()
    } catch (err) {
        console.log(err)
    }
}

connect()

module.exports = sequelize