'use strict'

const Sequelize = require('sequelize');
const sequelize = new Sequelize('database_development', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('../models/user.js')(sequelize, Sequelize);
db.story = require('../models/story.js')(sequelize, Sequelize);
db.posts = require('../models/post.js')(sequelize, Sequelize);

db.story.belongsTo(db.users);
db.posts.belongsTo(db.users);
db.users.hasMany(db.posts);
db.users.hasMany(db.story);

module.exports = db;