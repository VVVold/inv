const stockController = require('../controllers').stockController;
const investingStockController = require('../controllers').investingStockController;
const stockHistoricalDataController = require('../controllers').stockHistoricalDataController;

module.exports = (app) => {
    app.post('/api/createStock', stockController.createStock);
    app.post('/api/createStocks', stockController.createStocks);

    app.post('/api/createInvestingStock', investingStockController.createInvestingStock);
    app.post('/api/createInvestingStocks', investingStockController.createInvestingStocks);

    app.post('/api/createStocksData', stockHistoricalDataController.createStockData);
};