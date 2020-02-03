import express from 'express';
import controller from './controller';

export default express
    .Router()
    .get('/:fileId', controller.getFile)
    .post('/', controller.parse);
