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
    fileURL: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false
    },
    fileName: {
        type: Sequelize.STRING,
        allowNull: false
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
    }
}, {
    freezeTableName: true
})

exports.files = files;