import db from '../data-access/property.db';

class Property {
    getAllProperties() {
        return db.getAllProperties();
    }

    getPropertyById(id) {
        return db.getPropertyById(id);
    }

    addProperty(name, city, address, email, phone) {
        return db.addProperty(name, city, address, email, phone);
    }

    updateProperty(id, name, city, address, email, phone) {
        return db.updateProperty(id, name, city, address, email, phone);
    }

    deleteProperty(id) {
        return db.deleteProperty(id);
    }
}

export default new Property();
