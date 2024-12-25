const db = require('../utils/db');
const logger = require('../utils/logger');
const Response = require('./response');

module.exports = class m2StockPrice {
  // Available class variables:
  // m2Id,
  // m2Ticker,
  // m2Date,
  // m2Open,
  // m2High,
  // m2Low,
  // m2Close,
  // m2Volume,
  // m2AdjOpen,
  // m2AdjHigh,
  // m2AdjLow,
  // m2AdjClose,
  // m2AdjVolume,
  // m2DivCash,
  // m2SplitFactor
  // m2M1Id

  constructor(jsonObj) {
    this.parseDBObj(jsonObj);
  }

  static async findById(id) {
    const query = `SELECT * FROM sana.m2StockPrice WHERE "m2Id" =${id} ORDER BY "m2Date" DESC`;
    const response = await db.query(query);
    return new m2StockPrice(response.rows[0]);
  }

  static async findByTicker(ticker) {
    const query = `SELECT * FROM sana.m2StockPrice WHERE "m2Ticker" ='${ticker}' ORDER BY "m2Date" DESC`;
    const response = await db.query(query);
    return new m2StockPrice(response.rows[0]);
  }

  static async getAllStockPrice() {
    const query = `SELECT * FROM sana.m2StockPrice ORDER BY "m2Date" DESC`;
    const response = await db.query(query);
    return response.rows.map((stockPrices) => new m2StockPrice(stockPrices));
  }

  static async getStockPriceByDate(startDate, endDate, ticker) {
    let dyanamicWhere = '';
    if (ticker) {
      dyanamicWhere = ` AND "m2Ticker" = '${ticker}'`;
    }
    const query = `SELECT * FROM sana.m2StockPrice WHERE "m2Date" BETWEEN $1 AND $2 ${dyanamicWhere} ORDER BY "m2Date" DESC`;
    const response = await db.query(query, [startDate, endDate]);
    return response.rows.map((stockPrices) => new m2StockPrice(stockPrices));
  }

  parseDBObj(jsonObj) {
    if (!jsonObj) return;
    this.parseData(jsonObj);
  }

  parseData(jsonObj) {
    if (jsonObj.m2Id) {
      this.m2Id = jsonObj.m2Id;
    }
    if (jsonObj.m2Ticker || jsonObj.ticker) {
      this.m2Ticker = jsonObj.m2Ticker ? jsonObj.m2Ticker : jsonObj.ticker;
    }
    if (jsonObj.m2Date || jsonObj.date) {
      this.m2Date = jsonObj.m2Date ? jsonObj.m2Date : jsonObj.date;
    }
    if (jsonObj.m2Open || jsonObj.open) {
      this.m2Open = jsonObj.m2Open ? jsonObj.m2Open : jsonObj.open;
    }
    if (jsonObj.m2High || jsonObj.high) {
      this.m2High = jsonObj.m2High ? jsonObj.m2High : jsonObj.high;
    }
    if (jsonObj.m2Low || jsonObj.low) {
      this.m2Low = jsonObj.m2Low ? jsonObj.m2Low : jsonObj.low;
    }
    if (jsonObj.m2Close || jsonObj.close) {
      this.m2Close = jsonObj.m2Close ? jsonObj.m2Close : jsonObj.close;
    }
    if (jsonObj.m2Volume || jsonObj.volume) {
      this.m2Volume = jsonObj.m2Volume ? jsonObj.m2Volume : jsonObj.volume;
    }
    if (jsonObj.m2AdjOpen || jsonObj.adjOpen) {
      this.m2AdjOpen = jsonObj.m2AdjOpen ? jsonObj.m2AdjOpen : jsonObj.adjOpen;
    }
    if (jsonObj.m2AdjHigh || jsonObj.adjHigh) {
      this.m2AdjHigh = jsonObj.m2AdjHigh ? jsonObj.m2AdjHigh : jsonObj.adjHigh;
    }
    if (jsonObj.m2AdjLow || jsonObj.adjLow) {
      this.m2AdjLow = jsonObj.m2AdjLow ? jsonObj.m2AdjLow : jsonObj.adjLow;
    }
    if (jsonObj.m2AdjClose || jsonObj.adjClose) {
      this.m2AdjClose = jsonObj.m2AdjClose
        ? jsonObj.m2AdjClose
        : jsonObj.adjClose;
    }
    if (jsonObj.m2AdjVolume || jsonObj.adjVolume) {
      this.m2AdjVolume = jsonObj.m2AdjVolume
        ? jsonObj.m2AdjVolume
        : jsonObj.adjVolume;
    }
    if (jsonObj.m2DivCash || jsonObj.divCash) {
      this.m2DivCash = jsonObj.m2DivCash ? jsonObj.m2DivCash : jsonObj.divCash;
    }
    if (jsonObj.m2SplitFactor || jsonObj.splitFactor) {
      this.m2SplitFactor = jsonObj.m2SplitFactor
        ? jsonObj.m2SplitFactor
        : jsonObj.splitFactor;
    }
    if (jsonObj.m2M1Id) {
      this.m2M1Id = jsonObj.m2M1Id;
    }
  }

  async save() {
    let client;
    try {
      client = await db.connect();
      const query = `CALL sana.sp_insert_stockprice($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)`;
      const values = [
        this.m2Ticker,
        this.m2Date,
        this.m2Open,
        this.m2High,
        this.m2Low,
        this.m2Close,
        this.m2Volume,
        this.m2AdjOpen,
        this.m2AdjHigh,
        this.m2AdjLow,
        this.m2AdjClose,
        this.m2AdjVolume,
        this.m2DivCash,
        this.m2SplitFactor,
        this.m2M1Id,
        null, // OUT parameter
      ];
      const response = await client.query(query, values);
      logger.info('Stock price saved with id: ' + response.rows[0].p_key);
      this.m2Id = this.m2Id ? this.m2Id : response.rows[0].p_key;
      return new Response('Success', this, 200);
    } catch (error) {
      logger.error('Error saving stock price', error);
      return new Response('Failed', {}, 500);
    } finally {
      if (client) client.release();
    }
  }
};
