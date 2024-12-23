const Stock = require('../models/m1Stock');
const StockPrice = require('../models/m2StockPrice');
const tiingoService = require('../services/tiingoService');
const logger = require('../utils/logger');
const Response = require('../models/response');

async function createNewStock(ticker, response) {
  try {
    logger.info('Stock not found in DB fetching from Tiingo');
    const tiingoResponse = await tiingoService.getMetaData(ticker);
    logger.info(JSON.stringify(tiingoResponse.data));
    try {
      const stock = new Stock(tiingoResponse.data);
      response = await stock.save();
      return response;
    } catch (error) {
      logger.error('Error creating stock instance', error);
    }
  } catch (err) {
    logger.error('Error fetching metadata from Tiingo', err);
    return response;
  }
}

async function createNewStockPrice(ticker, response, stock) {
  try {
    logger.info('Not available in DB Fetching stock price from Tiingo');
    const tiingoResponse = await tiingoService.getStockPriceEod(ticker);
    logger.info('Fetched ' + JSON.stringify(tiingoResponse.data));
    try {
      if (!tiingoResponse.data[0]) {
        response.status = 404;
        response.message = 'No price data available for Ticker -' + ticker;
        logger.error('No price data available in Tiingo for Ticker -' + ticker);
        return response;
      }
      const m2StockPrice = new StockPrice(tiingoResponse.data[0]);
      m2StockPrice.m2Ticker = ticker;
      m2StockPrice.m2M1Id = stock.m1Id;
      response = await m2StockPrice.save();
      return response;
    } catch (error) {}
  } catch (error) {
    logger.error('Error fetching stock price from Tiingo', error);
    return response;
  }
}

exports.getStock = async (req, res, next) => {
  const ticker = req.params.ticker;
  let response = new Response('Failed', {}, 500);
  try {
    let stock = await Stock.findByTicker(ticker);
    // Check if stock is already in DB if not fetch from Tiingo then save to DB
    if (stock) {
      logger.info('Stock found in DB stock: ' + JSON.stringify(stock));
      response.data = stock;
      response.status = 200;
      response.message = 'Success';
      res.status(response.status).json(response);
    } else {
      response = await createNewStock(ticker, response);
      res.status(response.status).json(response);
    }
  } catch (error) {
    logger.error('Error fetching stock from DB', error);
    res.status(response.status).json(response);
  }
};

exports.getAllStocks = async (req, res, next) => {
  let stocks = [];
  try {
    logger.info('Fetching all stocks');
    stocks = await Stock.getAllStocks();
    logger.info('Fetched all stocks');
    res.status(200).json(new Response('Success', stocks, 200));
  } catch (error) {
    logger.error('Error fetching stocks', error);
    res.status(500).json(new Response('Failed', {}, 500));
  }
};

exports.getStockPriceEod = async (req, res, next) => {
  const ticker = req.params.ticker;

  let response = new Response('Failed', {}, 500);
  // TODO: Check if stockPrice is in DB if not fetch from Tiingo then save to DB
  let m2StockPrice = await StockPrice.findByTicker(ticker);

  if (m2StockPrice) {
    logger.info(
      'Stock price found in DB stock price: ' + JSON.stringify(m2StockPrice)
    );
    return res.status(200).json(new Response('Success', m2StockPrice, 200));
  } else {
    // Check if stock is in DB
    let stock = await Stock.findByTicker(ticker);
    if (!stock) {
      response = await createNewStock(ticker, response);
      if (response.status !== 201) {
        res.status(response.status).json(response);
        return;
      }
      stock = response.data;
    }
    try {
      response = await createNewStockPrice(ticker, response, stock);
      res.status(response.status).json(response);
    } catch (error) {
      logger.error('Error creating stock price instance', error);
      res.status(response.status).json(response);
    }
  }
};
exports.getAllStockPrices = async (req, res, next) => {
  let stockPrices = [];
  try {
    logger.info('Fetching all stocks prices');
    stockPrices = await StockPrice.getAllStockPrice();
    logger.info('Fetched all stock prices');
    res.status(200).json(new Response('Success', stockPrices, 200));
  } catch (error) {
    logger.error('Error fetching stock prices', error);
    res.status(500).json(new Response('Failed', {}, 500));
  }
};
