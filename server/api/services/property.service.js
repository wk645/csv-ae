import db from '../data-access/property.db';

class Property {
    getAllProperties() {
        /* istanbul ignore next */
        return db.getAllProperties();
    }

    getPropertyById(id) {
        /* istanbul ignore next */
        return db.getPropertyById(id);
    }

    addProperty(name, city, address, email, phone) {
        /* istanbul ignore next */
        return db.addProperty(name, city, address, email, phone);
    }

    updateProperty(id, name, city, address, email, phone) {
        /* istanbul ignore next */
        return db.updateProperty(id, name, city, address, email, phone);
    }

    deleteProperty(id) {
        /* istanbul ignore next */
        return db.deleteProperty(id);
    }
}

export default new Property();
