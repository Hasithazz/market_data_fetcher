DROP TABLE IF EXISTS sana.m3NewsFeed;

CREATE TABLE sana.m3NewsFeed (
    "m3Id" SERIAL PRIMARY KEY,
    "m3ArticleId" VARCHAR(255) NOT NULL,
    "m3Title" VARCHAR(255) NOT NULL,
    "m3Url" TEXT NOT NULL,
    "m3Description" TEXT,
    "m3PublishedDate" TIMESTAMP,
    "m3CrawlDate" TIMESTAMP,
    "m3Source" VARCHAR(255),
    "m3Tickers" VARCHAR(255),
    "m3Tags" VARCHAR(100)[]
);