module.exports = (sequelize, DataTypes) => {
    const Tenant = sequelize.define('Tenant', {
        company_name: DataTypes.STRING,
        business_type: DataTypes.STRING,
        address: DataTypes.STRING,
        contact_phone: DataTypes.STRING,
        email: DataTypes.STRING
    }, {});
    Tenant.associate = function (models) {
        models.Tenant.belongsTo(models.Property);
        models.Tenant.hasMany(models.User);
    };
    return Tenant;
};
