const spbStocksService = require("./../spbStocksService");
const investingStockService = require("./../investingStockService");

const validateSpbExchangeId = async ()=>{
    let stocks = await spbStocksService.get();

    stocks = stocks.filter(e=> !e.exchangeId);

    if (stocks.length){
        for (const stock of stocks) {
            let investingStocks = await investingStockService.get({shortName: stock.shortName});

            if (investingStocks.length !== 1)
                throw new Error('For stock '+stock.shortName+ ' there should be only 1 related investing stock');

            const investingStock = investingStocks[0];

            stock.exchangeId = investingStock.exchangeId;

            await spbStocksService.updateFieldsById(stock.id, {exchangeId: investingStock.exchangeId});
        }
    }
};

module.exports = {
    validateSpbExchangeId
};