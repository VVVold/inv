const investingStockService = require('./investingStockService');

const getDataItemsToUpdate = async () => {
    const result = [];

    (await getStocksWithoutInvestingId()).forEach(stock => result.push(createItem("getInvestingStockId", stock)));

    return result;
};

const getStocksWithoutInvestingId = async () => {
    const stocks = await investingStockService.get();

    return stocks.filter(s=> !s.investingStockId);
};

const createItem = (updaterName, data) => {
    return {
        updaterName,
        data
    };
};

module.exports = {
    getDataItemsToUpdate
};