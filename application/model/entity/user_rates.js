var Sequelize = require('sequelize');
var sequelize = require('../db');

const user_rates = sequelize.define('user_rates', {
    rate_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    file_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    rate: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

exports.user_rates = user_rates;