const investingStockRouter = require('./investingStockRouter');

module.exports = app => {
    app.use('/api/investingStocks', investingStockRouter);
};