var Sequelize = require('sequelize');
var sequelize = require('../db');

const files = sequelize.files('files', {
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
    }
})

exports.files = files;