const services = require('../services/index');

module.exports = {
    createInvestingStock: services.investingStockService.createInvestingStock,
    createInvestingStocks: services.investingStockService.createInvestingStocks
};