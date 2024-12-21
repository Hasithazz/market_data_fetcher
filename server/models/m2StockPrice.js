module.exports = class m2StockPrice {
    constructor(id, ticker, date, open, high, low, close, volume, adjOpen, adjHigh, adjLow, adjClose, adjVolume, divCash, splitFactor) {
        this.m2id = id;
        this.m2ticker = ticker;
        this.m2date = date;
        this.m2open = open;
        this.m2high = high;
        this.m2low = low;
        this.m2close = close;
        this.m2volume = volume;
        this.m2adjOpen = adjOpen;
        this.m2adjHigh = adjHigh;
        this.m2adjClose = adjClose;
        this.m2adjVolume = adjVolume;
        this.m2divCash = divCash;
        this.m2splitFactor = splitFactor;
    }

    static findById(id) {
    }

    static findByTicker(ticker) {
    }

    static getAllStocks() {}

    save() {

    }

}