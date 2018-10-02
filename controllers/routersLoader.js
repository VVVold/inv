const stockRouter = require('./stockRouter');
const investingStockRouter = require('./investingStockRouter');
const stockHistoricalDataRouter = require('./stockHistoricalDataRouter');
const bollingerRouter = require('./bollingerRouter');


module.exports = app => {
    app.use('/api/stocks', stockRouter);
    app.use('/api/investingStocks', investingStockRouter);
    app.use('/api/stockHistoricalData', stockHistoricalDataRouter);
    app.use('/api/bollingerRouter', bollingerRouter);
};