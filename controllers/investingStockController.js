const investingStockService = require('../services/investingStockService');

module.exports = {
    create: investingStockService.create,
    get: investingStockService.get
};