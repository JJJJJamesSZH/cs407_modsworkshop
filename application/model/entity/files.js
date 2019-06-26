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
        unique: true
    },
    dateCreated: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dateUpdated: {
        type: Sequelize.STRING,
    },
    downloads: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    likes: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    anonymous: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
}, {
    freezeTableName: true
})

exports.files = files;