const express = require('express');
const stockHistoricalDataController = require('./stockHistoricalDataController');
const middlewareCreator = require('../services/middlewareCreator');

const stockHistoricalDataRouter = express.Router();

stockHistoricalDataRouter.get('/get', middlewareCreator.createMiddleware({
    controller: stockHistoricalDataController,
    actionName: 'get',
    params: []
}));

stockHistoricalDataRouter.post('/create', middlewareCreator.createMiddleware({
    controller: stockHistoricalDataController,
    actionName: 'create',
    params: ['stocks']
}));


module.exports = stockHistoricalDataRouter;