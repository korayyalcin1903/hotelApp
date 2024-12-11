const { DataTypes } = require('sequelize');
const sequelize = require('../data/db');

const UserAllergen = sequelize.define('user_allergen', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    allergen: {
        type: DataTypes.STRING,
        allowNull: false
    },
},{
    timestamps: false,
});


module.exports = UserAllergen;
