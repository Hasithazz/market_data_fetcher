const Stock = require('../models/m1Stock');
const StockPrice = require('../models/m2StockPrice');
const tiingoService = require('../services/tiingoService');
const logger = require('../utils/logger');
const Response = require('../models/response');

exports.getStock = async (req, res, next) => {
  const ticker = req.params.ticker;

  let response = new Response('Failed', {}, 500);
  let stock = await Stock.findByTicker(ticker);

  //Check if stock is already in DB if not fetch from Tiingo then save to DB
  if (stock) {
    logger.info('Stock found in DB stock: ' + JSON.stringify(stock));
    response.data = new Stock(stock);
    response.status = 200;
    response.message = 'Success';
    res.status(response.status).json(response);
  } else {
    logger.info('Stock not found in DB fetching from Tiingo');
    try {
      const tiingoResponse = await tiingoService.getMetaData(ticker);
      try {
        logger.info(JSON.stringify(tiingoResponse.data));
        stock = new Stock(tiingoResponse.data);
        response = await stock.save();
        res.status(response.status).json(response);
      } catch (error) {
        logger.error('Error creating stock instance', error);
        res.status(response.status).json(response);
      }
    } catch (err) {
      logger.error('Error fetching metadata from Tiingo', err);
      res.status(response.status).json(response);
    }
  }
};

exports.getStockPriceEod = async (req, res, next) => {
  const ticker = req.params.ticker;

  let response = new Response('Failed', {}, 500);
  let m2StockPrice;

  //TODO: Check if stockPrice is in DB if not fetch from Tiingo then save to DB
  if (false) {
    //check if stock is in DB
    if (false) {
    }
  } else {
    try {
      logger.info('Not available in DB Fetching stock price from Tiingo');
      const tiingoResponse = await tiingoService.getStockPriceEod(ticker);
      logger.info('Fetched ' + JSON.stringify(tiingoResponse.data));
      try {
        m2StockPrice = new StockPrice(tiingoResponse.data[0]);
        m2StockPrice.m2Ticker = ticker;
        response = await m2StockPrice.save();
        console.log(response);
        res.status(response.status).json(response);
      } catch (error) {
        logger.error('Error creating stock price instance', error);
        res.status(response.status).json(response);
      }
    } catch (error) {
      logger.error('Error fetching stock price from Tiingo', error);
      res.status(response.status).json(response);
    }
  }
};
