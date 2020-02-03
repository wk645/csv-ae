import express from 'express';
import multer from 'multer';
import controller from './controller';

const upload = multer({ dest: `${__dirname}/uploads/` });

export default express
    .Router()
    .post('/', upload.single('aeFile'), controller.parse);
