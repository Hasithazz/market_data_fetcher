CREATE OR REPLACE PROCEDURE sana.sp_insert_stock(
    IN p_m1ticker character varying, 
    IN p_m1name character varying, 
    IN p_m1exchangecode character varying, 
    IN p_m1description text, 
    IN p_m1startdate date, 
    IN p_m1enddate date, 
    OUT inserted_id integer
)
LANGUAGE plpgsql
AS $procedure$
BEGIN
    INSERT INTO sana.m1Stock (
        "m1Ticker", "m1Name", "m1ExchangeCode", "m1Description", "m1StartDate", "m1EndDate"
    ) 
    VALUES (
        p_m1ticker, p_m1name, p_m1exchangecode, p_m1description, p_m1startdate, p_m1enddate
    )
    RETURNING "m1Id" INTO inserted_id;
EXCEPTION
    WHEN OTHERS THEN
        inserted_id := -1;
        -- Log the error or handle it as needed
        RAISE NOTICE 'Error inserting data: %', SQLERRM;
        RAISE EXCEPTION 'Error inserting data: %', SQLERRM;
END;
$procedure$