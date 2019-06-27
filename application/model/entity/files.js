var Sequelize = require('sequelize');
var sequelize = require('../db');

const files = sequelize.define('files', {
    fileID: {
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
    fileName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    key: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    dateCreated: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dateUpdated: {
        type: Sequelize.STRING,
    },
    downloadNum: {
        type: Sequelize.INTEGER
    },
    likes: {
        type: Sequelize.INTEGER
    },
    anonymous: {
        type: Sequelize.BOOLEAN
    }
}, {
    freezeTableName: true
})

exports.files = files;