const express = require('express');
const bollingerController = require('./bollingerController');
const middlewareCreator = require('../services/middlewareCreator');

const bollingerRouter = express.Router();

bollingerRouter.post('/calculateCoefficient', middlewareCreator.createMiddleware({
    controller: bollingerController,
    actionName: 'calculateCoefficient',
    params: ['shortName', 'N', 'D']
}));

bollingerRouter.post('/getCoefficientToAllStocks', middlewareCreator.createMiddleware({
    controller: bollingerController,
    actionName: 'getCoefficientToAllStocks',
    params: ['period', 'date']
}));

bollingerRouter.post('/getDataToPlotForCompany', middlewareCreator.createMiddleware({
    controller: bollingerController,
    actionName: 'getDataToPlotForCompany',
    params: ['shortName', 'period', 'date']
}));

bollingerRouter.post('/getVolatility', middlewareCreator.createMiddleware({
    controller: bollingerController,
    actionName: 'getVolatility',
    params: ['shortName', 'volatilityPeriod', 'date']
}));

bollingerRouter.post('/getTrendWithPeriod', middlewareCreator.createMiddleware({
    controller: bollingerController,
    actionName: 'getTrendWithPeriod',
    params: ['shortName', 'period', 'date', 'countOfPeriods']
}));

module.exports = bollingerRouter;