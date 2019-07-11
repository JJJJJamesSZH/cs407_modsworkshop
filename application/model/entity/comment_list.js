var Sequelize = require('sequelize');
var sequelize = require('../db');

const comment_list = sequelize.define('comment_list', {
    comment_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
    },
    file_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    comment: {
        type: Sequelize.STRING
    },
    like: {
        type: Sequelize.INTEGER
    },
    dateCreated: {
        type: Sequelize.STRING
    },
    dateUpdated: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true
})

exports.comment_list = comment_list;