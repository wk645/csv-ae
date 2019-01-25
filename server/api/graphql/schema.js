export default `
    type Property {
        name: String
        city: String
        address: String
        email: String
        phone: String
    }

    type Query {
        properties: [Property]!
        property(id: ID!): Property
    }


    type Mutation {
        addProperty(name: String, city: String, address: String, email: String, phone: String): Property!
        updateProperty(id: ID!, name: String, city: String, address: String, email: String, phone: String): [Property]!
        deleteProperty(id: ID!): Property!
    }
`;
