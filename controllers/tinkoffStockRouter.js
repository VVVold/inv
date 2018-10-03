const express = require('express');
const tinkoffStocksController = require('./tinkoffStocksController');
const middlewareCreator = require('../services/middlewareCreator');

const router = express.Router();

router.post('/create', middlewareCreator.createMiddleware({
    controller: tinkoffStocksController,
    actionName: 'create',
    params: ['stocks']
}));

module.exports = router;