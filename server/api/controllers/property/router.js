import express from 'express';
import controller from './controller';

export default express
    .Router()
    .get('/', controller.list)
    .get('/:id', controller.getById)
    .post('/', controller.add)
    .put('/:id', controller.update)
    .delete('/:id', controller.delete);
