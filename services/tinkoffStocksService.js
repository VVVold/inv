const tinkoffStocks = require('../models').tinkoffStocks;

const create = async (stocks)=>{

    const saveStocksPromises = stocks.map(entity => {
        return tinkoffStocks
            .findOrCreate({
                where: {
                    shortName: entity.shortName,
                },
                defaults: {
                    deleted: entity.deleted,
                    name: entity.name,
                }
            });
    });

    await Promise.all(saveStocksPromises);
};

module.exports = {
    create
};


