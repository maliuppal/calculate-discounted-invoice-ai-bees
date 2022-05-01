// const Category = require("../models/product.ts");

module.exports = (sequelize, Sequelize) => {

    const Product = sequelize.define('product', {
        name: {
            type: Sequelize.STRING,
        },
        price: {
            type: Sequelize.DECIMAL(10, 2),
        },
        discount: {
            type: Sequelize.DECIMAL(10, 2),
        }
    });

    // Product.belongsTo(Category, { foreignKey: 'categoryId' });

    return Product;
};
