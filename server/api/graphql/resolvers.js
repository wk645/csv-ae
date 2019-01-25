// mapping of actions for functions
export default {
    Query: {
        properties: (parent, args, { db }, info) => db.Property.findAll(), // eslint-disable-line no-unused-vars
        property: (parent, { id }, { db }, info) => db.Property.findById(id) // eslint-disable-line no-unused-vars
    },
    Mutation: {
        addProperty: (parent, {
            name, city, address, email, phone
        }, { db }, info) => db.Property.create({ // eslint-disable-line no-unused-vars
            name,
            city,
            address,
            email,
            phone
        }),
        updateProperty: (parent, {
            id, name, city, address, email, phone
        }, { db }, info) => db.Property.update({ // eslint-disable-line no-unused-vars
            name,
            city,
            address,
            email,
            phone
        }, {
            where: { id },
            returning: true
        }),
        deleteProperty: (parent, { id }, { db }, info) => db.Property.destroy({ // eslint-disable-line no-unused-vars
            where: { id }
        })
    }
};
