const { DataTypes } = require('sequelize')
const sequelize = require('../data/db')

const Message = sequelize.define('messages', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
}, {
    timestamps: true,
    freezeTableName: true
})

module.exports = Message