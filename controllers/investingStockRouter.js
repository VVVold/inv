const express = require('express');
const investingStockController = require('./investingStockController');
const middlewareCreator = require('../services/middlewareCreator');

const investingStockRouter = express.Router();

investingStockRouter.get('/get', middlewareCreator.createMiddleware({
    controller: investingStockController,
    actionName: 'get',
    params: []
}));

investingStockRouter.post('/createInvestingStocks', middlewareCreator.createMiddleware({
    controller: investingStockController,
    actionName: 'createInvestingStocks',
    params: ['stocks']
}));


module.exports = investingStockRouter;