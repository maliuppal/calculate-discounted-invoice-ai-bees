const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
);

sequelize.sync();

(async () => {
  try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();


const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.category = require("../models/category.model")(sequelize, Sequelize);
db.product = require("../models/product.model")(sequelize, Sequelize);
db.order = require("../models/order.model")(sequelize, Sequelize);
db.user = require("../models/user.model")(sequelize, Sequelize);


db.category.belongsTo(db.category, { foreignKey: 'parentCategoryId' });
db.category.hasMany(db.category, { foreignKey: 'parentCategoryId' });

db.category.hasMany(db.product, { foreignKey: 'categoryId' });
db.product.belongsTo(db.category, { foreignKey: 'categoryId' });

db.user.hasMany(db.order, { foreignKey: 'userId' });
db.order.belongsTo(db.user, { foreignKey: 'userId' });

module.exports = db;