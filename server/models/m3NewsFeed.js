const db = require('../utils/db');
const logger = require('../utils/logger');

module.exports = class NewsFeed {
  constructor(jsonObj) {
    this.parseDBObj(jsonObj);
  }
  parseDBObj(jsonObj) {
    if (!jsonObj) return;
    this.parseData(jsonObj);
  }
  parseData(jsonObj) {
    if (jsonObj.m3Id) {
      this.m3Id = jsonObj.m3Id;
    }
    if (jsonObj.m3ArticleId || jsonObj.id) {
      this.m3ArticleId = jsonObj.m3ArticleId ? jsonObj.m3ArticleId : jsonObj.id;
    }
    if (jsonObj.m3Title || jsonObj.title) {
      this.title = jsonObj.title ? jsonObj.title : jsonObj.title;
    }
    if (jsonObj.m3Url || jsonObj.url) {
      this.m3Url = jsonObj.m3Url ? jsonObj.m3Url : jsonObj.url;
    }
    if (jsonObj.m3Description || jsonObj.description) {
      this.m3Description = jsonObj.m3Description
        ? jsonObj.m3Description
        : jsonObj.description;
    }
    if (jsonObj.m3PublishedDate || jsonObj.publishedDate) {
      this.m3PublishedDate = jsonObj.m3PublishedDate
        ? jsonObj.m3PublishedDate
        : jsonObj.publishedDate;
    }

    if (jsonObj.m3CrawlDate || jsonObj.crawlDate) {
      this.m3CrawlDate = jsonObj.m3CrawlDate
        ? jsonObj.m3CrawlDate
        : jsonObj.crawlDate;
    }
    if (jsonObj.m3Source || jsonObj.source) {
      this.m3Source = jsonObj.m3Source ? jsonObj.m3Source : jsonObj.source;
    }
    if (jsonObj.m3Tickers || jsonObj.tickers) {
      this.m3Tickers = jsonObj.m3Tickers ? jsonObj.m3Tickers : jsonObj.tickers;
    }
    if (jsonObj.m3Tags || jsonObj.tags) {
      this.m3Tags = jsonObj.m3Tags ? jsonObj.m3Tags : jsonObj.tags;
    }
  }

  static async getAll() {
    const query = `SELECT * FROM sana.m3NewsFeed ORDER BY "m3PublishedDate" DESC`;
    const response = await db.query(query);
    return response.rows.map((newsFeed) => new NewsFeed(newsFeed));
  }

  static async findByTicker(ticker) {
    const query = `SELECT * FROM sana.m3NewsFeed WHERE "m3Tickers" = '${ticker}' ORDER BY "m3PublishedDate" DESC`;
    const response = await db.query(query);
    return response.rows.map((newsFeed) => new NewsFeed(newsFeed));
  }

  async save() {
    const querry =
      'Call sana.sp_insert_into_newsFeed($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)';
    const values = [
      this.m3ArticleId,
      this.title,
      this.m3Url,
      this.m3Description,
      this.m3PublishedDate,
      this.m3CrawlDate,
      this.m3Source,
      this.m3Tickers,
      this.m3Tags,
      null,
    ];

    let client;
    try {
      client = await db.connect();
      const response = await client.query(querry, values);
      this.m3Id = response.rows[0].m3Id;
      return new Response('Success', this, 200);
    } catch (error) {
      logger.error('Error saving news feed', error);
      return new Response('Failed', {}, 500);
    } finally {
      if (client) client.release();
    }
  }
};
