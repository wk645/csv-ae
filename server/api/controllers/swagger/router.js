import express from 'express';
import * as swaggerUi from 'swagger-ui-express';
import * as yaml from 'yamljs';
import path from 'path';

const swaggerDocument = yaml.load(path.join(__dirname, '/api.yaml'));

export default express
    .Router()
    .use('/', swaggerUi.serve)
    .get('/', swaggerUi.setup(swaggerDocument));
