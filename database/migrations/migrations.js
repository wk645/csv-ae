'use strict';

module.exports = {
    development: {
        url: 'postgres://convene_db_user:convene_db_password@localhost:5432/boilerplate_back_end_web',
        dialect: 'postgres',
        schema: 'public'
    },
    qa: {
        url: process.env.DATABASE_URL,
        dialect: 'postgres',
        schema: 'public'
    },
    production: {
        url: process.env.DATABASE_URL,
        dialect: 'postgres',
        schema: 'public',
        dialectOptions: {
            ssl: true
        }

    },
    staging: {
        url: process.env.DATABASE_URL,
        dialect: 'postgres',
        schema: 'public',
        dialectOptions: {
            ssl: true
        }
    }
};
