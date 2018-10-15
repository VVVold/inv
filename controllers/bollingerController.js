const bollingerService = require('../services/bollingerService');

module.exports = {
    calculateCoefficient: bollingerService.calculateCoefficient,
    getCoefficientToAllStocks: bollingerService.getCoefficientToAllStocks,
    getDataToPlotForCompany: bollingerService.getDataToPlotForCompany,
    getVolatility: bollingerService.getVolatility,
    getTrendWithPeriod: bollingerService.getTrendWithPeriod
};