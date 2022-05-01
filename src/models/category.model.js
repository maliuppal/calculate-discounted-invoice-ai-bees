module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define('category', {
        name: {
            type: Sequelize.STRING,
        },
        discount: {
            type: Sequelize.DECIMAL(10, 2),
        }
    });

    Category.belongsTo(Category, { foreignKey: 'parentCategoryId' });
    Category.hasMany(Category, { foreignKey: 'parentCategoryId' });

    return Category;
};
