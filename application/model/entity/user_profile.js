var Sequelize = require('sequelize');
var sequelize = require('../db');

const user_profile = sequelize.define('user_profile', {
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
    icon: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
    },
    uploadfile: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true
})

exports.user_profile = user_profile;