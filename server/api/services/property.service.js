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

    addProperty(property) {
        /* istanbul ignore next */
        return db.addProperty(property);
    }

    updateProperty(id, property) {
        /* istanbul ignore next */
        return db.updateProperty(id, property);
    }

    deleteProperty(id) {
        /* istanbul ignore next */
        return db.deleteProperty(id);
    }
}

export default new Property();
