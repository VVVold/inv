const services = require('../services/index');

module.exports = {
    create: services.stockHistoricalDataService.create,
    get: services.stockHistoricalDataService.get

};