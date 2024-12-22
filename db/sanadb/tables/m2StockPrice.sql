DROP TABLE IF EXISTS sana.m2stockprice;

CREATE TABLE IF NOT EXISTS sana.m2stockprice (
    "m2Id" SERIAL PRIMARY KEY,
    "m2Ticker" VARCHAR(10) NOT NULL,
    "m2Date" DATE NOT NULL,
    "m2Open" NUMERIC(10, 2),
    "m2High" NUMERIC(10, 2),
    "m2Low" NUMERIC(10, 2),
    "m2Close" NUMERIC(10, 2),
    "m2Volume" BIGINT,
    "m2AdjOpen" NUMERIC(10, 2),
    "m2AdjHigh" NUMERIC(10, 2),
    "m2AdjLow" NUMERIC(10, 2),
    "m2AdjClose" NUMERIC(10, 2),
    "m2AdjVolume" BIGINT,
    "m2DivCash" NUMERIC(10, 2),
    "m2SplitFactor" NUMERIC(10, 2),
    "m2M1Id" INT,
    FOREIGN KEY ("m2M1Id") REFERENCES sana.m1stock("m1Id")
);

CREATE UNIQUE INDEX m2stockprice_m2Date_m2Ticker_key ON sana.m2stockprice ("m2Date", "m2Ticker");