var Sequelize = require('sequelize');
var sequelize = require('../db');

const user_file = sequelize.define('user_file', {
    uid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    email: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    username: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    fileList: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true
})

exports.user_file = user_file;