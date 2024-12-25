const tiingoService = require('../services/tiingoService');
const logger = require('../utils/logger');
const NewsFeed = require('../models/m3NewsFeed');

async function createNewsFeed(response, ticker) {
  try {
    logger.info('News Feed not found in DB fetching from Tiingo');
    const tiingoResponse = await tiingoService.getNewsFeed(ticker);
    logger.info(JSON.stringify(tiingoResponse.data));
    const newsFeed = new NewsFeed(tiingoResponse.data);
    const response = await newsFeed.save();
    return response;
  } catch (err) {
    logger.error('Error fetching news feed from Tiingo', err);
    return response;
  }
}

exports.getTickerNewsFeed = async (req, res, next) => {
  const ticker = req.query.ticker ? req.query.ticker.toUpperCase() : '';
  let response = new Response('Failed', {}, 500);
  try {
    let newsFeed = ticker
      ? await NewsFeed.findByTicker(ticker)
      : await NewsFeed.getAll();
    if (newsFeed.length > 0) {
      logger.info(
        'News Feed found in DB newsFeed: ' + JSON.stringify(newsFeed)
      );
      response.data = newsFeed;
      response.status = 200;
      response.message = 'Success';
    } else {
      response = await createNewsFeed(response, ticker);
    }
    res.status(response.status).json(response);
  } catch (error) {
    logger.error('Error fetching news feed from DB', error);
    res.status(response.status).json(response);
  }
};
