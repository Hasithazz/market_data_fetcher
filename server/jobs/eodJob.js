const cron = require('node-cron');
const Stock = require('../models/m1Stock');
const StockPrice = require('../models/m2StockPrice');
const tiingoService = require('../services/tiingoService');
const logger = require('../utils/logger');

async function updateStockPriceCronJob() {
  logger.info('Updating stock price from EOD Cron Job');
  const stocks = await Stock.getAllStocks();
  const updatedStockPricers = [];
  for (const stock of stocks) {
    const tiingoResponse = tiingoService.getStockPriceEod(stock.m1Ticker);
    if (response.status === 200) {
      updatedStockPricers.push(response.data);
    }
  }
}
