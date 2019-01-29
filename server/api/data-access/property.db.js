const models = require('../../../database/models');

class PropertyDb {
    getAllProperties() {
        /* istanbul ignore next */
        return models.Property.findAll();
    }

    getPropertyById(id) {
        /* istanbul ignore next */
        return models.Property.findById(id);
    }

    addProperty(name, city, address, email, phone) {
        /* istanbul ignore next */
        return models.Property.create({
            name,
            city,
            address,
            email,
            phone
        });
    }

    updateProperty(id, name, city, address, email, phone) {
        /* istanbul ignore next */
        return models.Property.update({
            name,
            city,
            address,
            email,
            phone
        }, {
            where: { id },
            returning: true
        }).then(result => result[1] && result[1][0]);
    }

    deleteProperty(id) {
        /* istanbul ignore next */
        return models.Property.destroy({
            where: {
                id
            }
        });
    }
}

export default new PropertyDb();
