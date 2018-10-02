const express = require('express');
const investingStockController = require('./investingStockController');
const middlewareCreator = require('../services/middlewareCreator');

const investingStockRouter = express.Router();

investingStockRouter.get('/get', middlewareCreator.createMiddleware({
    controller: investingStockController,
    actionName: 'get',
    params: []
}));

investingStockRouter.post('/create', middlewareCreator.createMiddleware({
    controller: investingStockController,
    actionName: 'create',
    params: ['stocks']
}));


module.exports = investingStockRouter;