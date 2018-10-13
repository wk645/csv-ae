

module.exports = (sequelize, DataTypes) => {
    const Property = sequelize.define('Property', {
        name: DataTypes.STRING,
        city: DataTypes.STRING,
        address: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.STRING
    }, {});
    Property.associate = function (models) {
        models.Property.hasMany(models.Tenant);
    };
    return Property;
};
