const stockHistoricalDataService = require('./stockHistoricalDataService');

const getNeededStockHistoricalData = async shortName => {
    const stockHistoricalData = await stockHistoricalDataService.get();
    let neededStocks = [];

    stockHistoricalData.forEach(stock => {
        if (stock.shortName === shortName) {
            neededStocks.push(stock);
        }
    });

    return neededStocks;
};

const getDate = stocks => {
    let date = new Date(1970);

    stocks.forEach(stock => {
        if (stock.date > date) {
            date = stock.date;
        }
    });

    return date;
};

const MLN = (stocks, N, currentDate) => {
    let sum = 0;
    let count = 0;

    for (let stock of stocks) {
        if (Math.ceil(Math.abs(currentDate.getTime() - stock.date.getTime()) / (1000 * 3600 * 24)) < N + 10) {
            sum += stock.priceClosed;
            count = ++count;

            if (count == N) {
                return sum/N;
            }
        }
    }
};

const calculateParams = (stocks, N, currentDate) => {
    let M = parseInt(N);
    let sumDelta2 = 0;
    let count = 0;

    for (let stock of stocks) {
        let date = stock.date;

        if (Math.ceil(Math.abs(currentDate.getTime() - stock.date.getTime()) / (1000 * 3600 * 24)) < N + 10) {
            let mlN = MLN(stocks, M, date);
            sumDelta2 += Math.pow(stock.priceClosed - mlN, 2);
            count = ++count;

            if (count == M) {
                return { sigma: Math.sqrt(sumDelta2/M), mlN: mlN, priceClosed: stock.priceClosed };
            }
        }
    }
};

const calculateCoefficient = async (shortName, N, D) => {
    const stocks = await getNeededStockHistoricalData(shortName);
    const date = getDate(stocks);
    const params = calculateParams(stocks, N, date);
    const sigma = params.sigma;
    const mlN = params.mlN;
    const priceClosed = params.priceClosed;

    return (mlN - D*sigma)/priceClosed - 1;
};

module.exports = {
    calculateCoefficient
};