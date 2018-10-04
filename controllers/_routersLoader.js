
module.exports = app => {
    app.use('/api/stockHistoricalData', require('./stockHistoricalDataRouter'));
    app.use('/api/bollingerRouter', require('./bollingerRouter'));
    app.use('/api/investingStocks', require('./investingStockRouter'));
    app.use('/api/spbStocks', require('./spbStockRouter'));
    app.use('/api/investingDataUpdater', require('./investingDataUpdaterRouter'));
};