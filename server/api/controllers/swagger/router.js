import express from 'express';
import * as swaggerUi from 'swagger-ui-express';
import * as yaml from 'js-yaml';
import fs from 'fs';

const swaggerDocument = yaml.safeLoad(fs.readFileSync('./swagger.yml', 'utf8'));

export default express
    .Router()
    .get('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
