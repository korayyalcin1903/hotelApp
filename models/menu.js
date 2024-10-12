const { DataTypes } = require('sequelize')
const sequelize = require('../data/db')

const Menu = sequelize.define('menu', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    availability: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})

module.exports = Menu