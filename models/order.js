const { DataTypes } = require('sequelize');
const sequelize = require('../data/db');
const Customer = require('./customer'); // Customer modeli
const Menu = require('./menu'); // Menu modeli

const Order = sequelize.define('order', {
    totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    roomNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

// // Model ilişkileri
// Order.belongsTo(Customer, { foreignKey: 'customer_id', as: 'customer' });
// Order.belongsTo(Menu, { foreignKey: 'menu_item_id', as: 'menu' });

module.exports = Order;
