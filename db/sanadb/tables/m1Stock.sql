-- Table: sana.m1stock

DROP TABLE IF EXISTS sana.m1stock;

CREATE TABLE IF NOT EXISTS sana.m1stock (
    "m1Id" SERIAL NOT NULL,
    "m1Ticker" varchar(10) NOT NULL,
    "m1Name" varchar(100) NOT NULL,
    "m1ExchangeCode" varchar(10) NOT NULL,
    "m1Description" text,
    "m1StartDate" date,
    "m1EndDate" date,
    PRIMARY KEY (m1Id)
);

CREATE UNIQUE INDEX m1stock_m1Ticker_m1ExchangeCode_key ON sana.m1stock USING btree ("m1ExchangeCode", "m1Ticker");