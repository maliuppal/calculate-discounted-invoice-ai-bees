module.exports = (sequelize, Sequelize) => {

    const User = sequelize.define('user', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        fullname: {
            type: Sequelize.STRING,
            notEmpty: true,
        },
        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        status: {
            type: Sequelize.ENUM('active', 'inactive'),
            defaultValue: 'active',
        },
    });

    return User;
    
}
