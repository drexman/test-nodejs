const env = require('./env.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    port: env.port,
    dialect: env.dialect,
    operatorsAliases: false,
    pool: {
        max: env.pool.max,
        min: env.pool.min,
        acquire: env.pool.acquire,
        idle: env.pool.idle
    }
});
sequelize.sync({ force: false }); 
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


//Modelos
db.customer = require('../models/customer.js')(sequelize, Sequelize);
db.address = require('../models/address.js')(sequelize, Sequelize); 
db.fileuser = require('../models/fileuser.js')(sequelize,Sequelize);

//Relacionamentos
db.fileuser.hasMany(db.customer,{foreignKey: 'fk_fileuserid', onDelete: 'CASCADE', hooks: true});
db.customer.belongsTo(db.fileuser,{foreignKey: 'fk_fileuserid'}); 

db.customer.hasOne(db.address,{foreignKey: 'fk_customerid', onDelete: 'CASCADE', hooks: true});
db.address.belongsTo(db.customer, {foreignKey: 'fk_customerid'});

module.exports = db;
