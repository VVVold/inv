const investingStockService = require('../services/investingStockService');

module.exports = {
    createInvestingStocks: investingStockService.createInvestingStocks,
    get: investingStockService.get,
};