const express = require('express');
const investingDataUpdaterController = require('./investingDataUpdaterController');
const middlewareCreator = require('../services/middlewareCreator');

const bollingerRouter = express.Router();

bollingerRouter.post('/getDataItemsToUpdate', middlewareCreator.createMiddleware({
    controller: investingDataUpdaterController,
    actionName: 'getDataItemsToUpdate',
    params: []
}));


module.exports = bollingerRouter;