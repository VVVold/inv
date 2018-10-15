const stockHistoricalDataService = require('../services/stockHistoricalDataService');

module.exports = {
    create: stockHistoricalDataService.create,
    get: stockHistoricalDataService.get,
    getAllCompanyShortNames: stockHistoricalDataService.getAllCompanyShortNames,
    getStocksByShortName: stockHistoricalDataService.getStocksByShortName,
    getStocksByPeriodAndDate: stockHistoricalDataService.getStocksByPeriodAndDate,
    getStocksByShortNamePeriodAndDate: stockHistoricalDataService.getStocksByShortNamePeriodAndDate
};