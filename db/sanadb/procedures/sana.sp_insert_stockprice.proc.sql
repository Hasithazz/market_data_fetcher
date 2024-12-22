CREATE OR REPLACE PROCEDURE sana.sp_insert_stockprice(IN p_m2ticker character varying, IN p_m2date date, IN p_m2open numeric, IN p_m2high numeric, IN p_m2low numeric, IN p_m2close numeric, IN p_m2volume bigint, IN p_m2adjopen numeric, IN p_m2adjhigh numeric, IN p_m2adjlow numeric, IN p_m2adjclose numeric, IN p_m2adjvolume bigint, IN p_m2divcash numeric, IN p_m2splitfactor numeric, IN p_m2m1id integer, OUT p_key integer)
 LANGUAGE plpgsql
AS $procedure$
BEGIN

    IF(p_m2m1id IS NULL) THEN
        SELECT "m1Id" INTO p_m2M1Id FROM sana.m1stock WHERE "m1Ticker" = p_m2Ticker;
    ELSE
        p_m2M1Id := p_m2m1id;
    END IF;
   
    
    INSERT INTO sana.m2stockprice (
        "m2Ticker", "m2Date", "m2Open", "m2High", "m2Low", "m2Close", "m2Volume",
        "m2AdjOpen", "m2AdjHigh", "m2AdjLow", "m2AdjClose", "m2AdjVolume",
        "m2DivCash", "m2SplitFactor", "m2M1Id"
    ) VALUES (
        p_m2Ticker, p_m2Date, p_m2Open, p_m2High, p_m2Low, p_m2Close, p_m2Volume,
        p_m2AdjOpen, p_m2AdjHigh, p_m2AdjLow, p_m2AdjClose, p_m2AdjVolume,
        p_m2DivCash, p_m2SplitFactor, p_m2M1Id
    ) RETURNING "m2Id" INTO p_key;
    EXCEPTION
    WHEN OTHERS THEN
        
        RAISE NOTICE 'Error inserting data: %', SQLERRM;
        p_key := -1;
END;
$procedure$