CREATE OR REPLACE PROCEDURE sp_insert_into_newsFeed(
    p_m3ArticleId VARCHAR,
    p_m3Title VARCHAR,
    p_m3Url TEXT,
    p_m3Description TEXT,
    p_m3PublishedDate TIMESTAMP,
    p_m3CrawlDate TIMESTAMP,
    p_m3Source VARCHAR,
    p_m3Tickers VARCHAR,
    p_m3Tags VARCHAR,
    OUT p_m3Id INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO "m3NewsFeed" (
        "m3ArticleId",
        "m3Title",
        "m3Url",
        "m3Description",
        "m3PublishedDate",
        "m3CrawlDate",
        "m3Source",
        "m3Tickers",
        "m3Tags"
    ) VALUES (
        p_m3ArticleId,
        p_m3Title,
        p_m3Url,
        p_m3Description,
        p_m3PublishedDate,
        p_m3CrawlDate,
        p_m3Source,
        p_m3Tickers,
        p_m3Tags
    )RETURNING "m3Id" INTO p_m3Id;
END;
$$;