module.exports = class m1Stock {
    constructor(id, ticker, name, exchangeCode, description, startDate, endDate) {
        this.m1Id = id;
        this.m1Ticker = ticker;
        this.m1Name = name;
        this.m1ExchangeCode = exchangeCode;
        this.m1Description = description;
        this.m1StartDate = startDate;
        this.m1EndDate = endDate;
    }

    static getAllStocks() {
    }

    static findById(id) {
    }

    static findByTicker(ticker) {
    }

    save() {

    }
}