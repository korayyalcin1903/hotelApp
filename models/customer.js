const { DataTypes } = require('sequelize')
const sequelize = require('../data/db')

const Customer = sequelize.define('customer', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    roomNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: true,
    freezeTableName: true  // Tablo adı 'customer' olarak kalacak, pluralize edilmez
});

module.exports = Customer;