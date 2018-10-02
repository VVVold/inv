const express = require('express');
const stockController = require('./stockController');
const middlewareCreator = require('../services/middlewareCreator');

const stockRouter = express.Router();

stockRouter.get('/get', middlewareCreator.createMiddleware({
    controller: stockController,
    actionName: 'get',
    params: []
}));

stockRouter.post('/create', middlewareCreator.createMiddleware({
    controller: stockController,
    actionName: 'create',
    params: ['stocks']
}));

module.exports = stockRouter;