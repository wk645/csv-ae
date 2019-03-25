// mapping of actions for functions
export default {
    Query: {
        properties: (parent, args, { db }, info) => db.Property.findAll(), // eslint-disable-line no-unused-vars
        property: (parent, { id }, { db }, info) => db.Property.findByPk(id) // eslint-disable-line no-unused-vars
    },
    Mutation: {
        addProperty: (parent, {
            property
        }, { db }, info) => db.Property.create(property), // eslint-disable-line no-unused-vars
        updateProperty: (parent, {
            id, property
        }, { db }, info) => db.Property.update(property, { // eslint-disable-line no-unused-vars
            where: { id },
            returning: true
        }),
        deleteProperty: (parent, { id }, { db }, info) => db.Property.destroy({ // eslint-disable-line no-unused-vars
            where: { id }
        })
    }
};
