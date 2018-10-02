const stockHistoricalDataService = require('./stockHistoricalDataService');
const stockService = require('./stockService');

const compareDate = (stockA, stockB) => {
    return stockB.date.getTime() - stockA.date.getTime();
};

const compareCoefficient = (stockA, stockB) => {
    return stockA.coefficient - stockB.coefficient;
};

const getNeededStockHistoricalData = async shortName => {
    const stockHistoricalData = await stockHistoricalDataService.get();
    let neededStocks = [];

    stockHistoricalData.forEach(stock => {
        if (stock.shortName === shortName) {
            neededStocks.push(stock);
        }
    });

    return neededStocks.sort(compareDate);
};

const MLN = (stocks, N) => {
    let sum = 0;
    let count = 0;

    for (let stock of stocks) {
        sum += stock.priceClosed;
        count = ++count;

        if (count == N) {
            return sum / N;
        }
    }
};

const calculateParams = (stocks, N) => {
    let M = parseInt(N);
    let sumDelta2 = 0;
    let count = 0;

    for (let stock of stocks) {
        let date = stock.date;

        let mlN = MLN(stocks, M, date);
        sumDelta2 += Math.pow(stock.priceClosed - mlN, 2);
        count = ++count;

        if (count == M) {
            return {sigma: Math.sqrt(sumDelta2 / M), mlN: mlN, priceClosed: stock.priceClosed};
        }
    }
};

const calculateCoefficient = async (shortName, N, D) => {
    const stocks = await getNeededStockHistoricalData(shortName);
    const params = calculateParams(stocks, N);
    const sigma = params.sigma;
    const mlN = params.mlN;
    const priceClosed = params.priceClosed;

    return (mlN - D * sigma) / priceClosed - 1;
};

const getCoefficientToAllStocks = async () => {
    const N = 20;
    const D = 2;
    const allStocks = await stockService.get();
    let coefficientTable = [];

    for (let stock of allStocks) {
        coefficientTable.push({
            shortName: stock.shortName,
            coefficient: await calculateCoefficient(stock.shortName, N, D)
        });
    }

    return coefficientTable.sort(compareCoefficient);
};

module.exports = {
    calculateCoefficient,
    getCoefficientToAllStocks
};