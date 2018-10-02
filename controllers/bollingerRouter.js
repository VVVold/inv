const express = require('express');
const bollingerController = require('./bollingerController');
const middlewareCreator = require('../services/middlewareCreator');

const bollingerRouter = express.Router();

bollingerRouter.post('/calculateCoefficient', middlewareCreator.createMiddleware({
    controller: bollingerController,
    actionName: 'calculateCoefficient',
    params: ['shortName', 'N', 'D']
}));

bollingerRouter.get('/getCoefficientToAllStocks', middlewareCreator.createMiddleware({
    controller: bollingerController,
    actionName: 'getCoefficientToAllStocks',
    params: []
}));

module.exports = bollingerRouter;