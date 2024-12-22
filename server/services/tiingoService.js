const bodyParser = require('body-parser');
const config = require('../config/config');
const axios = require('axios');
const logger = require('../utils/logger');

const tiingoUrl = 'https://api.tiingo.com/tiingo';
const tiingoConnectionTestURL = ' https://api.tiingo.com/api/test/';

const errorMsg = 'Error while sending Request';

const headers = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Token ${config.tiingo_token}`,
  },
};

async function checkConnection() {
  try {
    axios
      .get(tiingoConnectionTestURL, headers)
      .then((response) => {
        console.log(response.data);
        logger.info('Successfuly Connected to Tiingo');
      })
      .catch((err) => {
        logger.error('Error while connecting to Tiingo', err);
      });
  } catch (error) {
    logger.error('Error while connecting to Tiingo', error);
  }
}

checkConnection();

exports.getMetaData = async (ticker) => {
  const url = tiingoUrl + '/daily/' + ticker;
  logger.info(`Sending request to tiingo endpoint: ${url}`);
  return axios.get(url, headers);
};

exports.getStockPriceEod = async (ticker) => {
  const url = tiingoUrl + '/daily/' + ticker + '/prices';
  logger.info(`Sending request to tiingo endpoint: ${url}`);
  return axios.get(url, headers);
};
