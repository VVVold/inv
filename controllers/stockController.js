const services = require('../services/index');

module.exports = {
    createStock: services.stockService.createStock,
    createStocks: services.stockService.createStocks
};