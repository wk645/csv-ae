const models = require('../../../database/models');

class PropertyDb {
    getAllProperties() {
        return models.Property.findAll();
    }

    getPropertyById(id) {
        return models.Property.findById(id);
    }

    addProperty(name, city, address, email, phone) {
        console.log(name);
        return models.Property.create({
            name,
            city,
            address,
            email,
            phone
        });
    }

    updateProperty(id, name, city, address, email, phone) {
        return models.Property.update({
            name,
            city
        }, {
            where: {
                id
            }
        });
    }

    deleteProperty(id) {
        return models.Property.destroy({
            where: {
                id
            }
        });
    }
}

export default new PropertyDb();
