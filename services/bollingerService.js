const stocksHistoricalData = require('./stockHistoricalDataService');
const getDateFromString = require('./dateParser').getDateFromString;

const countPeriodsForCoefficient = 40;
const countOfSigma = 2;
const countOfWorkingDaysPerYear = 252;

const compareDate = (stockA, stockB) => {
    return stockB.date.getTime() - stockA.date.getTime();
};

const compareCoefficient = (stockA, stockB) => {
    return stockB.coefficient - stockA.coefficient;
};

const getNeededStockHistoricalData = async (stockHistoricalData, shortName, period) => {
    let neededStocks = [];
    let currentStock = period;
    let N = 0;

    stockHistoricalData.forEach(stock => {
        if (stock.shortName === shortName && currentStock++ === period) {
            if (N >= countPeriodsForCoefficient)
                return neededStocks;

            neededStocks.push(stock);
            currentStock = 1;
            N++;
        }
    });
};

const getNeededStockHistoricalDataByDate = async (stockHistoricalData, shortName, period, date) => {
    const neededDate = getDateFromString(date);

    let neededStocks = [];
    let currentStock = period;
    let N = 0;

    for (let stockData of stockHistoricalData) {
        if (stockData.shortName === shortName && stockData.date <= neededDate && currentStock++ === period) {
            if (N >= countPeriodsForCoefficient)
                return neededStocks;

            neededStocks.push(stockData);
            currentStock = 1;
            N++;
        }
    }
};

const MLN = (stocks, N, date) => {
    let sum = 0;
    let count = 0;

    for (let stock of stocks) {
        if (date >= stock.date) {
            sum += stock.priceClosed;
            count = ++count;

            if (count === N) {
                return sum / N;
            }
        }
    }
};

const calculateParams = (stocks, N) => {
    let sumDelta2 = 0;
    let count = 0;
    let priceClosed;

    for (let stock of stocks) {
        let date = stock.date;
        let mlN = MLN(stocks, N, date);

        sumDelta2 += Math.pow(stock.priceClosed - mlN, 2);
        count = ++count;

        if (count === 1)
            priceClosed = stock.priceClosed;

        if (count === N)
            return {sigma: Math.sqrt(sumDelta2 / N), mlN: mlN, priceClosed: priceClosed};
    }
};

const calculateCoefficient = async (stockHistoricalData, shortName, date, period) => {
    let stocks;

    if (date) {
        stocks = await getNeededStockHistoricalDataByDate(stockHistoricalData, shortName, date, period);
    } else {
        stocks = await getNeededStockHistoricalData(stockHistoricalData, shortName, period);
    }

    if (stocks.length < countPeriodsForCoefficient) console.log('не достаточно значений');

    const params = calculateParams(stocks, countPeriodsForCoefficient / 2);
    const sigma = params.sigma;
    const mlN = params.mlN;
    const priceClosed = params.priceClosed;

    return (mlN - countOfSigma * sigma) / priceClosed - 1;
};

const getCoefficientToAllStocks = async (period, date) => {
    let time = Date.now();
    let coefficientTable = [];

    const currentPeriod = parseInt(period) || 1;
    const stocksShortNames = await stocksHistoricalData.getAllCompanyShortNames();
    const stockHistoricalData = await stocksHistoricalData.getStocksByPeriodAndDate(period, date);
    const stockHistoricalDataSorted = stockHistoricalData.sort(compareDate);

    for (let stock of stocksShortNames) {
        try {
            let coefficient = {
                shortName: stock.shortName,
                coefficient: await calculateCoefficient(stockHistoricalDataSorted, stock.shortName, currentPeriod, date)
            };

            coefficientTable.push(coefficient);
            console.log(coefficient);

        } catch (e) {
            console.log(`коэффициент для ${stock.shortName} не может быть посчитан`)
        }
    }

    time = Date.now() - time;
    console.log('Время выполнения = ', time);

    return coefficientTable.sort(compareCoefficient);
};

const getDataToPlotForCompany = async (shortName, period, date) => {
    let N = 0;
    let dataForPlot = [];
    let time = Date.now();

    const currentPeriod = parseInt(period) || 1;
    const stockHistoricalData = await stocksHistoricalData.getStocksByShortNamePeriodAndDate(shortName, currentPeriod, date);
    const stockHistoricalDataSorted = stockHistoricalData.sort(compareDate);

    for (let stock of stockHistoricalDataSorted) {
        try {
            let stocks = stockHistoricalDataSorted.slice(N, countPeriodsForCoefficient + N++);
            let params = calculateParams(stocks, countPeriodsForCoefficient / 2);

            let data = {
                data: stock.date,
                mlN: params.mlN,
                tlN: params.mlN + 2 * params.sigma,
                blN: params.mlN - 2 * params.sigma
            };

            dataForPlot.push(data);
            console.log(data);

        } catch (e) {
            console.log(`коэффициент для ${stock.shortName} не может быть посчитан`)
        }
    }

    time = Date.now() - time;
    console.log('Время выполнения = ', time);

    return dataForPlot;
};

//todo
const getVolatility = async (shortName, volatilityPeriod, date) => {
    let N = 0;
    let sigma = 0;
    let time = Date.now();

    const period = parseInt(volatilityPeriod);
    const currentPeriod = 1;
    const stockHistoricalData = await stocksHistoricalData.getStocksByShortNamePeriodAndDate(shortName, currentPeriod, date);
    const stockHistoricalDataSorted = stockHistoricalData.sort(compareDate);

    for (let i = 0; i < period; i++) {
        const stocks = stockHistoricalDataSorted.slice(N, countPeriodsForCoefficient + N++);
        const params = calculateParams(stocks, countPeriodsForCoefficient / 2);

        sigma += params.sigma;
    }

    time = Date.now() - time;
    console.log('Время выполнения = ', time);

    return (sigma / volatilityPeriod) / Math.sqrt(1 / (countOfWorkingDaysPerYear * volatilityPeriod));
};

//todo normal period
const getTrendWithPeriod = async (shortName, period, date, countOfPeriods) => {
    const stockHistoricalData = await stocksHistoricalData.getStocksByShortNamePeriodAndDate(shortName, period, date);
    const stockHistoricalDataSorted = stockHistoricalData.sort(compareDate);

    let N = 0;
    let sum = 0;
    let trendArray = [];
    let deltaArray = [];

    for (let stock of stockHistoricalDataSorted) {
        N++;

        if (N >= 1 && N <= 3)
            sum += stock.priceClosed;

        if (N === 23) {
            trendArray.push(sum / 3);
            N = 0;
            countOfPeriods--;
            sum = 0;
        }

        if (countOfPeriods < 0) {
            for (let s = 0; s < trendArray.length - 1; s++) {
                deltaArray[s] = trendArray[s] - trendArray[s + 1]
            }

            return deltaArray;
        }
    }
};

module.exports = {
    calculateCoefficient,
    getCoefficientToAllStocks,
    getDataToPlotForCompany,
    getVolatility,
    getTrendWithPeriod
};