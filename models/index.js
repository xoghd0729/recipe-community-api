const Sequelize = require('sequelize');
const User = require('./user');
const Comment = require('./comment');
const Recipe = require('./recipe');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const sequelize = new Sequelize(
    config.database, config.username, config.password, config
);

const db = {
    sequelize,
    User,
    Comment,
    Recipe,
};

User.init(sequelize);
Comment.init(sequelize);
Recipe.init(sequelize);


User.associate(db);
Comment.associate(db);
Recipe.associate(db);

module.exports = db;
