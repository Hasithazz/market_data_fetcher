DROP TABLE IF EXISTS sana.m2stockprice;

CREATE TABLE sana.m2stockprice(
    "m2Id" SERIAL NOT NULL,
    "m2Ticker" varchar(10) NOT NULL,
    "m2Date" date NOT NULL,
    "m2Open" numeric(10,2),
    "m2High" numeric(10,2),
    "m2Low" numeric(10,2),
    "m2Close" numeric(10,2),
    "m2Volume" bigint,
    "m2AdjOpen" numeric(10,2),
    "m2AdjHigh" numeric(10,2),
    "m2AdjLow" numeric(10,2),
    "m2AdjClose" numeric(10,2),
    "m2AdjVolume" bigint,
    "m2DivCash" numeric(10,2),
    "m2SplitFactor" numeric(10,2),
    "m2M1Id" integer NOT NULL,
    PRIMARY KEY("m2Id"),
    CONSTRAINT m2stockprice_m2M1Id_fkey FOREIGN key("m2M1Id") REFERENCES m1stock("m1Id")
);
CREATE UNIQUE INDEX m2stockprice_m2date_m2ticker_key ON sana.m2stockprice USING btree ("m2Date","m2Ticker");