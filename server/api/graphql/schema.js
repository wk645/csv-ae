export default `
    type Property {
        name: String
        city: String
        address: String
        email: String
        phone: String
    }

    input PropertyInput {
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
        addProperty(property: PropertyInput!): Property!
        updateProperty(id: ID!, property: PropertyInput!): Property!
        deleteProperty(id: ID!): Property!
    }
`;
