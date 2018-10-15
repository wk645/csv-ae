import * as express from 'express';

export default express
    .Router()
    .use((req, res) => {
        res.status(404).send('Route not found.');
    });
