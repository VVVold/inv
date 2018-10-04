const investingStockService = require("./../investingStockService");

const validate = async ()=>{
    const stocks = await investingStockService.get();

    checkStocksHaveExchangeId(stocks);
};

function checkStocksHaveExchangeId(stocks){
    stocks = stocks.filter(e=> !e.exchangeId);

    if (stocks.length) {
        const errorMessage = 'Some stocks doe not have ExchangeId property!';

        console.log(errorMessage, stocks.map(e=> e.shortName));
        throw new Error(errorMessage);
    }
}

module.exports = {
    validate,
};