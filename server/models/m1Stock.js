const db = require('../utils/db');
const logger = require('../utils/logger');
const Response = require('./response');

module.exports = class M1Stock {
  // Available Class variables:
  // m1Id
  // m1Ticker
  // m1Name
  // m1ExchangeCode
  // m1Description
  // m1StartDate
  // m1EndDate

  constructor(jsonObj) {
    this.parseDBObj(jsonObj);
  }

  static async getAllStocks() {
    const query = `SELECT * FROM sana.m1stock`;

    const response = await db.query(query);
    return response.rows.map((stock) => new M1Stock(stock));
  }

  static async findById(id) {
    const query = `SELECT * FROM sana.m1stock where "m1Id" = '${id}';`;

    const response = await db.query(query);
    return new M1Stock(response.rows[0]);
  }

  static async findByTicker(ticker) {
    const query = `SELECT * FROM sana.m1stock where "m1Ticker" = '${ticker}';`;

    const response = await db.query(query);

    return response.rows[0];
  }

  parseDBObj(jsonObj) {
    if (!jsonObj) return;
    this.parseData(jsonObj);
  }

  parseDBObj(jsonObj) {
    if (!jsonObj) return;
    this.parseData(jsonObj);
  }

  parseData(jsonObj) {
    if (jsonObj.m1Id) {
      this.m1Id = jsonObj.m1Id;
    }
    if (jsonObj.m1Ticker || jsonObj.ticker) {
      this.m1Ticker = jsonObj.m1Ticker ? jsonObj.m1Ticker : jsonObj.ticker;
    }
    if (jsonObj.m1Name || jsonObj.name) {
      this.m1Name = jsonObj.m1Name ? jsonObj.m1Name : jsonObj.name;
    }
    if (jsonObj.m1ExchangeCode || jsonObj.exchangeCode) {
      this.m1ExchangeCode = jsonObj.m1ExchangeCode
        ? jsonObj.m1ExchangeCode
        : jsonObj.exchangeCode;
    }
    if (jsonObj.m1Description || jsonObj.name) {
      this.m1Description = jsonObj.m1Description
        ? jsonObj.m1Description
        : jsonObj.description;
    }
    if (jsonObj.m1StartDate || jsonObj.startDate) {
      this.m1StartDate = jsonObj.m1StartDate
        ? jsonObj.m1StartDate
        : jsonObj.startDate;
    }
    if (jsonObj.m1EndDate || jsonObj.endDate) {
      this.m1EndDate = jsonObj.m1EndDate ? jsonObj.m1EndDate : jsonObj.endDate;
    }
  }

  async save() {
    let client;
    try {
      client = await db.connect();

      const query = `
            CALL sana.sp_insert_stock($1, $2, $3, $4, $5, $6, $7);
        `;
      const values = [
        this.m1Ticker,
        this.m1Name,
        this.m1ExchangeCode,
        this.m1Description,
        this.m1StartDate,
        this.m1EndDate,
        null,
      ];
      const response = await client.query(query, values);
      console.log(response);
      logger.info('Stock created in DB with id', response.rows[0].inserted_id);
      this.m1Id = response.rows[0].inserted_id;
      return new Response('Success', this, 201);
    } catch (error) {
      logger.error('Error saving stock data', error);
      return new Response('Failed', {}, 500);
    } finally {
      if (client) {
        client.release();
      }
    }
  }
};
