const services = require('../services/index');

module.exports = {
    create: services.stockService.create,
    get: services.stockService.get,
};