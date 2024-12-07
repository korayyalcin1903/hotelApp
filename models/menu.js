const { DataTypes } = require('sequelize')
const sequelize = require('../data/db')

const Menu = sequelize.define('menu_items', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    availability: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
})

module.exports = Menu