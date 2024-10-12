const { DataTypes } = require('sequelize')
const sequelize = require('../data/db')

const Order = sequelize.define('order', {
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
})

module.exports = Order