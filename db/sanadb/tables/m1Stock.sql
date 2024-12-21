
CREATE TABLE sana.m1Stock (
    m1Id SERIAL PRIMARY KEY,
    m1Ticker VARCHAR(10) NOT NULL,
    m1Name VARCHAR(100) NOT NULL,
    m1ExchangeCode VARCHAR(10) NOT NULL,
	m1Description VARCHAR(255),
	m1StartDate Date,
	m1EndDate Date
);
