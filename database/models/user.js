module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        email: DataTypes.STRING
    }, {});
    User.associate = function (models) {
        models.User.belongsTo(models.Tenant);
    };
    return User;
};
