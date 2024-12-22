CREATE OR REPLACE PROCEDURE sana.sp_insert_stock(IN p_m1ticker character varying, IN p_m1name character varying, IN p_m1exchangecode character varying, IN p_m1description text, IN p_m1startdate date, IN p_m1enddate date, OUT inserted_id integer)
 LANGUAGE plpgsql
AS $procedure$
BEGIN
    INSERT INTO sana.m1Stock (
        "m1Ticker", "m1Name", "m1ExchangeCode", "m1Description", "m1StartDate", "m1EndDate"
    ) VALUES (
        P_M1TICKER, P_M1NAME, P_M1EXCHANGECODE, P_M1DESCRIPTION, P_M1STARTDATE, P_M1ENDDATE
    )
	RETURNING "m1Id" INTO inserted_id;
EXCEPTION
    WHEN OTHERS THEN
	INSERTED_ID:= -1;
        -- Log the error or handle it as needed
        RAISE NOTICE 'Error inserting data: %', SQLERRM;
        RAISE EXCEPTION 'Error inserting data: %', SQLERRM;
END;
$procedure$