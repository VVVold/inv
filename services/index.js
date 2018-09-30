const stockService = require('./stockService');
const investingStockService = require('./investingStockService');
const stockHistoricalDataService = require('./stockHistoricalDataService');
const dateParser = require('./dateParser');

module.exports = {
    stockService: stockService,
    investingStockService: investingStockService,
    stockHistoricalDataService: stockHistoricalDataService,
    dateParser: dateParser
};