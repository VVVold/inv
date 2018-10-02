const bollingerService = require('../services/bollingerService');

module.exports = {
    calculateCoefficient: bollingerService.calculateCoefficient,
    getCoefficientToAllStocks: bollingerService.getCoefficientToAllStocks
};