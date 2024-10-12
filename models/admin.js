const { DataTypes } = require('sequelize')
const sequelize = require('../data/db')

const Admin = sequelize.define('admin', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Admin