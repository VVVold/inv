const services = require('../services/index');

module.exports = {
    createStockData: services.stockHistoricalDataService.createStocksData
};