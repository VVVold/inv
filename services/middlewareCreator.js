const actionHandlerMiddlewareCreator = require('./actionHandlerMiddlewareCreator');
const { resolve, handle } = require('../middlewares/resultHandler');

const createMiddleware = config => [actionHandlerMiddlewareCreator.createMiddleware(config), resolve, handle];

module.exports = {
    createMiddleware
};