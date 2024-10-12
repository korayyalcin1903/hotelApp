const { DataTypes } = require('sequelize')
const sequelize = require('../data/db')

const OrderDetail = sequelize.define('order_detail', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
})

module.exports = OrderDetail