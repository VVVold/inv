const investingStock = require('../models').investingStock;

const create = async (stocks) => {

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
                    }
                });
        }catch (e) {

        }
    }
};

const get = async ()=>{
    const dbStocks = await investingStock.findAll();

    return dbStocks.map(e=>({
        shortName: e.shortName,
        urlId: e.urlId
    }));
};

function validateStocksBeforeSaving(stocks){
    const stock = stocks.find(e => !e.shortName || !e.name || !e.exchangeId || !e.urlId);

    if (stock){
        throw new Error('Для акции не заполнены все поля: ' + JSON.stringify(stock))
    }
}

module.exports = {
    create,
    get,
};