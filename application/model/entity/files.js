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
    username: {
        type: Sequelize.STRING
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
    rate: {
        type: Sequelize.DOUBLE
    }, 
    anonymous: {
        type: Sequelize.BOOLEAN
    }
}, {
    freezeTableName: true
})

exports.files = files;