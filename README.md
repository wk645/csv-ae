# Back End Boilerplate

A back end boilerplate for standardizing development of new NodeJs, Express based Rest Api projects.

Uses:
[Express](https://www.npmjs.com/package/express)

[Sequelize](https://sequelize.readthedocs.io/en/v3/)

[Swagger](https://swagger.io/)

[EsLint](https://eslint.org/)

[Babel](https://babeljs.io/)

## Table of Contents

* [Goals](#markdown-header-goals)
* [Technologies](#markdown-header-technologies)
* [Setup](#markdown-header-setup)
* [Commands](#markdown-header-commands)
    * [Development](#markdown-header-development)
    * [Linting](#markdown-header-linting)
    * [Docker](#markdown-header-docker)
    * [Sequelize](#markdown-header-sequelize)
    * [Swagger](#markdown-header-swagger)
* [Source Code Organization](#markdown-header-source-code-organization)

## Goals

The goal of this boilerplate is to establish **the standard project structure with robust tools and technologies to use when starting to work on a new Rest Api project.**, rather
than having to figure out what tools to use and how to structure your code, this MUST be your starting reference architecture.

## Important Note

This project is open source, meaning we accept code contributions and pull requests to update and improve this nodejs api boilerplate.

## Technologies

The project is built primarily around [Express](https://www.npmjs.com/package/express)

Uses [Babel](https://babeljs.io/) to transpile to future JavaScript syntax.

JavaScript linting is accomplished via [ESLint](https://eslint.org/).

The Api endpoints are documented via [Swagger](https://swagger.io/).

[Docker](https://www.docker.com/) is used for deployment.

[GraphQL Playground](https://github.com/prisma/graphql-playground) is very helpful when working with GraphQL APIs.

## Setup

Dependencies are managed using [NPM](https://www.npmjs.com/).

```sh
# Install local dependencies
npm install
```

### First time Dev Setup

This makes the assumption that you have copied this from the boilerplate and
are going to run it with the included database models and setup. This is
probably not what you want so have a look the [Sequelize](#markdown-header-sequelize)
section below.

If you are running this project locally for the first time you'll need to do
some one time setup. It's assumed that you have Postgres running locally. Have
a look at `database/config/config.json`. Change any values to something that
makes sense. You probably at least want to change the database name.

Start by running the following commands in psql. You will want to change
convene_db_user, convene_db_password and convene_db_name to values set in
`database/config/config.json`

```sql
CREATE ROLE convene_db_user WITH LOGIN PASSWORD 'convene_db_password';
ALTER ROLE convene_db_user CREATEDB;
CREATE DATABASE convene_db_name;
GRANT ALL PRIVILEGES ON DATABASE convene_db_name TO convene_db_user;
```

Then run migrations to install the schema into the database.

```bash
sequelize db:migrate
```

## Commands

### Development

```sh
# Start the Nodejs server using Nodemon
npm run dev
```

### Build - Other than dev

```sh
# Transpile to ES6 by running
npm run compile

# Run by using
npm run start
```

### When in Dev Mode use

```sh
# If in Dev mode you can skip the compile/start steps and run
npm run dev
```

```sh
# If debugging in dev mode, to add the --inspect flag, use:
npm run dev:debug
```

### Linting

```sh
# To run eslint
npm run lint
```

```sh
# To automatically fix linting issues, run
npm run lint:fix
```

### Docker

There are several Bash scripts to help interact with Docker.

```sh
# Build Docker image
bash ./devops/build_me.sh [tag]

# Run Docker image
bash ./devops/run_me.sh [tag]

# Push Docker image to registry
bash ./devops/push_me.sh [tag]
```

All of these Bash scripts use the `convenedev` user. They use the directory name as the image name. The optional `[tag]` argument defaults to `latest`; it will confirm with the user before using the default.

### Sequelize

```sh
# The .sequelizerc file tells the sequelize-cli where to create migrations, seeders, models and the project config
# Oncd that file is created,run:
sequelize init

# That command will create `config/config.json`, `models/index.js`, `migrations` and `seeders` directories and files.
# Next, open and edit `config/config.json` then update the database connection details
# This assumes you have postgres installed locally with a database named: boilerplate_back_end_web
# Login to your local postgres instance using pgadmin 4 or the psql service via your terminal using:
# psql postgres --u postgres

# create a new role in psql:
CREATE ROLE convene_db_user WITH LOGIN PASSWORD 'convene_db_password';

# grant the create db permission to the role
ALTER ROLE convene_db_user CREATEDB;

# create the database
CREATE DATABASE boilerplate_back_end_web;

# grant our user the proper permissions to the db
GRANT ALL PRIVILEGES ON DATABASE boilerplate_back_end_web TO convene_db_user;

# To generate new model, using, for example, the Property entity from Elevate v1, using the sequelize cli
sequelize model:create --name Property --attributes name:string,city:string,address:string,email:string,phone:string

# Next, we need at least another model to establish a relationship/association
# properties have tenant companies, let's create another model
sequelize model:create --name Tenant --attributes company_name:string,business_type:string,address:string,contact_phone:string,email:string

# Once the models are created, edit the files to include associations
# Example association from the property model:
 Property.associate = function (models) {
        models.Property.hasMany(models.Tenant);
    };

# Another association from the tenant model:
Tenant.associate = function (models) {
        models.Tenant.belongsTo(models.Property);
        models.Tenant.hasMany(models.User);
    };

# Next, have the sequelize cli run a db migration to generate the tables and relationships in the database
# Run:
sequelize db:migrate

# Start creating controllers, routes, services and of course data access operations to support at least Add, Update, Delete, GetAll and GetById

#For more information, read the sequelize docs: http://docs.sequelizejs.com/
```

### Swagger

```sh
# The Swagger docs are available at: /api/v1/docs

# To update the swagger document and add/remove/change routes, just update the api.yaml file, located under:
# /server/api/controllers/swagger/api.yaml

# To serve up the swagger documentation with a test UI we are using the npm package; swagger-ui-express
# and also yamljs to convert from yaml to json

# why a yaml file and not json?  to make it easier to manually edit the file.

# last but not least, rely on the swagger editor to edit the swagger document: https://editor.swagger.io/
# by manually creating our own swagger file, as opposed to auto generating it, we get more control over both the
# swagger document and get to control our express routes and folder structure.
# for more information, check out the official swagger documentation: https://swagger.io/docs/specification/about/
```

### Testing
```sh
# List of tools used for unit testing are: mocha, chai, sinon, nyc (istanbul), and supertest

# Mocha - the test runner

# Chai - an assertion library

# Sinon - Mocks, spies, and stubs

# Nyc - test coverage monitor

# Supertest - the HTTP assertion library (endpoints/routes/CRUD, etc.)
```
