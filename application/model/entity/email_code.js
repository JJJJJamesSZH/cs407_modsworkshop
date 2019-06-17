var Sequelize = require('sequelize');
var sequelize = require('../db');

const email_code = sequelize.define('email_code', {
    email: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    code: {
        type: Sequelize.STRING,
        allowNull: false
    },
    timestamp: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    freezeTableName: true
});

exports.email_code = email_code;