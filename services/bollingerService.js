const stocksHistoricalData = require('./stockHistoricalDataService');

const compareDate = (stockA, stockB) => {
    return stockB.date.getTime() - stockA.date.getTime();
};

const compareCoefficient = (stockA, stockB) => {
    return stockB.coefficient - stockA.coefficient;
};

const getNeededStockHistoricalData = async (stockHistoricalData, shortName) => {
    let neededStocks = [];
    let N = 0;

    stockHistoricalData.forEach(stock => {


        if (stock.shortName === shortName) {
            if (++N > 40) return;

            neededStocks.push(stock);
        }
    });

    return neededStocks.sort(compareDate);
};

const MLN = (stocks, N, date) => {
    let sum = 0;
    let count = 0;

    for (let stock of stocks) {
        if (date >= stock.date) {
            sum += stock.priceClosed;
            count = ++count;

            if (count == N) {
                return sum / N;
            }
        }
    }
};

const calculateParams = (stocks, N) => {
    let M = parseInt(N);
    let sumDelta2 = 0;
    let count = 0;
    let priceClosed;

    for (let stock of stocks) {
        let date = stock.date;

        let mlN = MLN(stocks, M, date);
        sumDelta2 += Math.pow(stock.priceClosed - mlN, 2);
        count = ++count;

        if (count == 1) {
            priceClosed = stock.priceClosed;
        }

        if (count == M) {
            return {sigma: Math.sqrt(sumDelta2 / M), mlN: mlN, priceClosed: priceClosed};
        }
    }
};

const calculateCoefficient = async (stockHistoricalData, shortName, N, D) => {
    const stocks = await getNeededStockHistoricalData(stockHistoricalData, shortName);

    if (stocks.length < 40) console.log('не достаточно значений');

    const params = calculateParams(stocks, N);
    const sigma = params.sigma;
    const mlN = params.mlN;
    const priceClosed = params.priceClosed;

    return (mlN - D * sigma) / priceClosed - 1;
};

const getCoefficientToAllStocks = async () => {
    const N = 20;
    const D = 2;
    const stocksShortNames = await stocksHistoricalData.getAllCompanyShortNames();
    const stockHistoricalData = await stocksHistoricalData.get();
    let coefficientTable = [];

    for (let stock of stocksShortNames) {
        try {
            let coefficient = {
                shortName: stock.shortName,
                coefficient: await calculateCoefficient(stockHistoricalData, stock.shortName, N, D)
            };
            coefficientTable.push(coefficient);
            console.log(coefficient)
        } catch (e) {
            console.log(`коэффициент для ${stock.shortName} не может быть посчитан`)
        }
    }

    return coefficientTable.sort(compareCoefficient);
};

module.exports = {
    calculateCoefficient,
    getCoefficientToAllStocks
};