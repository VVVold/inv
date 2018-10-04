const investingStockService = require('./investingStockService');
const stockHistoricalDataService = require('./stockHistoricalDataService');
const dateParser = require('./dateParser');

module.exports = {
    investingStockService: investingStockService,
    stockHistoricalDataService: stockHistoricalDataService,
    dateParser: dateParser
};