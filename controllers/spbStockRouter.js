const express = require('express');
const spbStocksController = require('./spbStocksController');
const middlewareCreator = require('../services/middlewareCreator');

const router = express.Router();

router.post('/create', middlewareCreator.createMiddleware({
    controller: spbStocksController,
    actionName: 'create',
    params: ['stocks']
}));



module.exports = router;