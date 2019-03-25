const models = require('../../../database/models');

class PropertyDb {
    getAllProperties() {
        /* istanbul ignore next */
        return models.Property.findAll();
    }

    getPropertyById(id) {
        /* istanbul ignore next */
        return models.Property.findByPk(id);
    }

    addProperty(property) {
        /* istanbul ignore next */
        return models.Property.create(property);
    }

    updateProperty(id, property) {
        /* istanbul ignore next */
        return models.Property.update(property, {
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
