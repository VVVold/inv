const investingStock = require('../models').investingStock;

const create = async stocks => {

    validateStocksBeforeSaving(stocks);

    for(var entity of stocks){
        try {
            await investingStock
                .findOrCreate({
                    where: {
                        shortName: entity.shortName,
                        exchangeId: entity.exchangeId,
                    },
                    defaults: {
                        name: entity.name,
                        urlId: entity.urlId,
                        investingStockId: entity.investingStockId,
                    }
                });
        }catch (e) {

        }
    }
};

const get = async (filterOptions)=>{

    const dbStocks = await investingStock.findAll({ where: filterOptions });

    return dbStocks.map(e=>({
        shortName: e.shortName,
        urlId: e.urlId,
        investingStockId: e.investingStockId,
        exchangeId: e.exchangeId,
    }));
};

const validateStocksBeforeSaving = stocks => {
    const stock = stocks.find(e => !e.shortName || !e.name || !e.exchangeId || !e.urlId);

    if (stock){
        throw new Error('Для акции не заполнены все поля: ' + JSON.stringify(stock))
    }
};

module.exports = {
    create,
    get
};