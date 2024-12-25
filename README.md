# Market Data Fetcher

Real-time market data fetching application using the Tiingo API.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Pre-Requisits](#pre-requisits)
- [Installation](#installation)
- [Configurations](#configurations)
- [API Endpoints](#api-endpoints)
- [WebSocket Events](#websocket-events)

## Introduction

Market Data Fetcher is a Node.js application that fetches real-time market data and news feeds using the Tiingo API. It provides RESTful API endpoints and WebSocket support for real-time updates.

## Features

- Fetch stock prices and news feeds from the Tiingo API
- Store data in a PostgreSQL database
- Provide RESTful API endpoints for accessing data
- Real-time updates using WebSocket

## Pre-Requisits

- Node version -v20.16.0 (Using in this project) or Higher!
- npm version - 10.8.1 or (Using in this project) Higher!
- Postgres SQL
- Postman

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Hasithazz/market_data_fetcher.git
   cd market_data_fetcher
   ```
2. Execute the sql objects inside "db" folder from postgres according to the following order

   1 - sys/ db.sql <br>
   2 - sys/ schema.sql <br>
   3 - tables/ m1Stock.sql <br>
   4 - tables/ m2StockPrice.sql <br>
   5 - tables/ m3NewsFeed.sql <br>
   6 - procedures/ sana.sp_insert_stock.proc.sql <br>
   7 - procedures/ sana.sp_insert_stockprice.proc.sql <br>
   8 - procedures/ sana.sp_insert_into_newsFeed.proc.sql

3. Execute below commands
   ```sh
   cd .\server\
   npm install
   ```
4. Config according to your environmnet in .env file

5. Execute below command to start the server
   ```sh
   cd .\server\
   npm start-server
   ```

## Configuarations

Create .env file inside the SERVER folder and add following configs

```
# Node
PORT=3000

# Database
DB_USER=postgres
DB_HOST=localhost
DB_NAME=sanadb
DB_PASSWORD=your_password
DB_PORT=5432

# Tiingo API
API_KEY=your_tiingo_api_key

# Alpha Vantage API
API_KEY_ALPHA=your_alpha_vantage_api_key

```

## API Endpoints

All requests are GET requests. End point responses are always come as Json Object similler to below

```
{
    message:"Server Message",
    status:"Response status",
    data: "{} or an array of {}"
}
```

### Stock Endpoints

1.  HOST:PORT/stock/stocks - get All Stock Meta details available within the DB as an array of JSON objects below example describes the one element of JSON object array<br>
    eg:- <br>
    request = localhost:3000/stock/stocks<br><br>
    <table>
    <th>Field Name
    <th>JSON Field
    <th> Data Type
    <th> Description
    <tr>
    <td>ID
    <td> m1Id
    <td> int
    <td> DB Id of the stock
    </tr>
    <tr>
    <td>Ticker
    <td> m1Ticker
    <td> String
    <td> Ticker Code of the Stock
    </tr>
    <tr>
    <td>Name
    <td> m1Name
    <td> String
    <td> Name of the Stock
    </tr>
    <tr>
    <td> Exchange Code
    <td> m1ExchangeCode
    <td> String
    <td> Exchange Code of the Stock
    </tr>
    <tr>
    <td> Description
    <td> m1Description
    <td> String
    <td> Description of the Stock
    </tr>
    <tr>
    <td> Start Date
    <td> m1StartDate
    <td> String
    <td> Earliest Date for data availability
    </tr>
    <tr>
    <td> End Date
    <td> m1EndDate
    <td> String
    <td> Last Date for data availability
    </tr>
    </table>

    ```json
    {
      "message": "Success",
      "data": [
        {
          "m1Id": 31,
          "m1Ticker": "CUGPX",
          "m1Name": "Columbia Quality Income 529 Portfolio A",
          "m1ExchangeCode": "NMFQS",
          "m1Description": "Columbia US Government Mortgage Port A",
          "m1StartDate": "2017-01-31T18:30:00.000Z",
          "m1EndDate": "2024-10-03T18:30:00.000Z"
        },
        {
          "m1Id": 32,
          "m1Ticker": "CUFTMX",
          "m1Name": "Guggenheim US 50 Div Strategy Portf Fd USD Ser 38 MNT CASH",
          "m1ExchangeCode": "NMFQS",
          "m1Description": "Guggenheim US 50 Div Strategy Portf Fd USD Ser 38 MNT CASH"
        },
        {
          "m1Id": 33,
          "m1Ticker": "CUGKF",
          "m1Name": "Chugoku Marine Paints Ltd",
          "m1ExchangeCode": "OTCGREY",
          "m1Description": "DELISTED - Chugoku Marine Paints Ltd"
        }
      ],
      "status": 200
    }
    ```

2.  HOST:PORT/stock/stock/:ticker - Get Stock Meta Details for selected Ticker as a JSON Object<br>

    eg:- <br>
    Requset = localhost:3000/stock/stock/aapl <br>
    Response = <br>
    <table>
    <th>Field Name
    <th>JSON Field
    <th> Data Type
    <th> Description
    <tr>
    <td>ID
    <td> m1Id
    <td> int
    <td> DB Id of the stock
    </tr>
    <tr>
    <td>Ticker
    <td> m1Ticker
    <td> String
    <td> Ticker Code of the Stock
    </tr>
    <tr>
    <td>Name
    <td> m1Name
    <td> String
    <td> Name of the Stock
    </tr>
    <tr>
    <td> Exchange Code
    <td> m1ExchangeCode
    <td> String
    <td> Exchange Code of the Stock
    </tr>
    <tr>
    <td> Description
    <td> m1Description
    <td> String
    <td> Description of the Stock
    </tr>
    <tr>
    <td> Start Date
    <td> m1StartDate
    <td> String
    <td> Earliest Date for data availability
    </tr>
    <tr>
    <td> End Date
    <td> m1EndDate
    <td> String
    <td> Last Date for data availability
    </tr>
    </table>
    <br>

    ```json
    {
      "message": "Success",
      "data": {
        "m1Id": 32,
        "m1Ticker": "CUFTMX",
        "m1Name": "Guggenheim US 50 Div Strategy Portf Fd USD Ser 38 MNT CASH",
        "m1ExchangeCode": "NMFQS",
        "m1Description": "Guggenheim US 50 Div Strategy Portf Fd USD Ser 38 MNT CASH",
        "m1StartDate": null,
        "m1EndDate": null
      },
      "status": 200
    }
    ```

    <br>

3.  HOST:PORT/stock/stock/price/:ticker - Get Stock Price Details for selected Ticker as a JSON Object <br>
    eg:- <br>
    Requset = localhost:3000/stock/stock/price/CUGPX
    <br>

    <table>
    <th> Field Name
    <th> JSON Field
    <th> Data Type
    <th> Description
    <tr>
    <tr>
    <td> Id
    <td> m2Id
    <td> int
    <td> Database ID
    </tr>
    <tr>
     <td> Ticker
    <td> m2Ticker
    <td> string
    <td> Ticker Code of Stock
    </tr>
    <tr>
    <td> Date
    <td> m2Date
    <td> string
    <td> Date of the price
    </tr>
    <tr>
    <tr>
    <td> Adjusted Open
    <td> m2AdjOpen
    <td> int
    <td> The adjusted opening price for the asset on the given date.
    </tr>
    <tr>
    <td> Adjusted High
    <td> m2AdjHigh
    <td> int
    <td> The adjusted high price for the asset on the given date.
    </tr>
    <tr>
    <td> Adjusted Low
    <td> m2AdjLow
    <td> int
    <td> The adjusted low price for the asset on the given date.
    </tr>
    <tr>
    <td> Adjusted Close
    <td> m2AdjClose
    <td> int
    <td> The adjusted closing price for the asset on the given date.
    </tr>
    <tr>
    <td> Adjusted Volume
    <td> m2AdjVolume
    <td> bigint
    <td> The adjusted trading volume for the asset on the given date.
    </tr>
    <tr>
    <td> Dividend Cash
    <td> m2DivCash
    <td> int
    <td> The cash dividend for the asset on the given date.
    </tr>
    <tr>
    <td> Split Factor
    <td> m2SplitFactor
    <td> int
    <td> The split factor for the asset on the given date.
    </tr>
    <tr>
    <td> M1 ID
    <td> m2M1Id
    <td> int
    <td> Foreign key referencing m1Stock table.
    </tr>
    </table>

    <br>

    ```json
    {
      "message": "Success",
      "data": {
        "m2Id": 3,
        "m2Ticker": "CUGPX",
        "m2Date": "2024-10-03T18:30:00.000Z",
        "m2Open": "16.55",
        "m2High": "16.55",
        "m2Low": "16.55",
        "m2Close": "16.55",
        "m2AdjOpen": "16.55",
        "m2AdjHigh": "16.55",
        "m2AdjLow": "16.55",
        "m2AdjClose": "16.55",
        "m2SplitFactor": "1.00",
        "m2M1Id": 31
      },
      "status": 200
    }
    ```

    <br>

4.  HOST:PORT/stock/stocks/price - Get Stock Price Details for all Ticker in DB as an Array of JSON Object <br>
    eg:- <br>
    Requset = localhost:3000/stock/stocks/price
    <br>
    <table>
    <th> Field Name
    <th> JSON Field
    <th> Data Type
    <th> Description
    <tr>
    <tr>
    <td> Id
    <td> m2Id
    <td> int
    <td> Database ID
    </tr>
    <tr>
    <td> Ticker
    <td> m2Ticker
    <td> string
    <td> Ticker Code of Stock
    </tr>
    <tr>
    <td> Date
    <td> m2Date
    <td> string
    <td> Date of the price
    </tr>
    <tr>
    <tr>
    <td> Adjusted Open
    <td> m2AdjOpen
    <td> int
    <td> The adjusted opening price for the asset on the given date.
    </tr>
    <tr>
    <td> Adjusted High
    <td> m2AdjHigh
    <td> int
    <td> The adjusted high price for the asset on the given date.
    </tr>
    <tr>
    <td> Adjusted Low
    <td> m2AdjLow
    <td> int
    <td> The adjusted low price for the asset on the given date.
    </tr>
    <tr>
    <td> Adjusted Close
    <td> m2AdjClose
    <td> int
    <td> The adjusted closing price for the asset on the given date.
    </tr>
    <tr>
    <td> Adjusted Volume
    <td> m2AdjVolume
    <td> bigint
    <td> The adjusted trading volume for the asset on the given date.
    </tr>
    <tr>
    <td> Dividend Cash
    <td> m2DivCash
    <td> int
    <td> The cash dividend for the asset on the given date.
    </tr>
    <tr>
    <td> Split Factor
    <td> m2SplitFactor
    <td> int
    <td> The split factor for the asset on the given date.
    </tr>
    <tr>
    <td> M1 ID
    <td> m2M1Id
    <td> int
    <td> Foreign key referencing m1Stock table.
    </tr>
    </table>

    <br>

    ```json
    {
      "message": "Success",
      "data": [
        {
          "m2Id": 1,
          "m2Ticker": "CSOL",
          "m2Date": "2024-12-19T18:30:00.000Z",
          "m2Open": "0.01",
          "m2High": "0.02",
          "m2Low": "0.01",
          "m2Close": "0.02",
          "m2Volume": "16257",
          "m2AdjOpen": "0.01",
          "m2AdjHigh": "0.02",
          "m2AdjLow": "0.01",
          "m2AdjClose": "0.02",
          "m2AdjVolume": "16257",
          "m2SplitFactor": "1.00",
          "m2M1Id": 18
        },
        {
          "m2Id": 3,
          "m2Ticker": "CUGPX",
          "m2Date": "2024-10-03T18:30:00.000Z",
          "m2Open": "16.55",
          "m2High": "16.55",
          "m2Low": "16.55",
          "m2Close": "16.55",
          "m2AdjOpen": "16.55",
          "m2AdjHigh": "16.55",
          "m2AdjLow": "16.55",
          "m2AdjClose": "16.55",
          "m2SplitFactor": "1.00",
          "m2M1Id": 31
        }
      ],
      "status": 200
    }
    ```

    <br>

5.  HOST:PORT/stock/stocks/price/:startDate/:endDate?ticker= - Get Stock Price Details for all tickers of requested Ticker in DB as an Array of JSON Object <br>
    eg:- <br>
    Requset = localhost:3000/stock/stock/price/2024-09-01/2024-12-31 OR localhost:3000/stock/stock/price/2024-09-01/2024-12-31?ticker=CSOL
    <br>
    <table>
    <th> Field Name
    <th> JSON Field
    <th> Data Type
    <th> Description
    <tr>
    <tr>
    <td> Id
    <td> m2Id
    <td> int
    <td> Database ID
    </tr>
    <tr>
    <td> Ticker
    <td> m2Ticker
    <td> string
    <td> Ticker Code of Stock
    </tr>
    <tr>
    <td> Date
    <td> m2Date
    <td> string
    <td> Date of the price
    </tr>
    <tr>
    <tr>
    <td> Adjusted Open
    <td> m2AdjOpen
    <td> int
    <td> The adjusted opening price for the asset on the given date.
    </tr>
    <tr>
    <td> Adjusted High
    <td> m2AdjHigh
    <td> int
    <td> The adjusted high price for the asset on the given date.
    </tr>
    <tr>
    <td> Adjusted Low
    <td> m2AdjLow
    <td> int
    <td> The adjusted low price for the asset on the given date.
    </tr>
    <tr>
    <td> Adjusted Close
    <td> m2AdjClose
    <td> int
    <td> The adjusted closing price for the asset on the given date.
    </tr>
    <tr>
    <td> Adjusted Volume
    <td> m2AdjVolume
    <td> bigint
    <td> The adjusted trading volume for the asset on the given date.
    </tr>
    <tr>
    <td> Dividend Cash
    <td> m2DivCash
    <td> int
    <td> The cash dividend for the asset on the given date.
    </tr>
    <tr>
    <td> Split Factor
    <td> m2SplitFactor
    <td> int
    <td> The split factor for the asset on the given date.
    </tr>
    <tr>
    <td> M1 ID
    <td> m2M1Id
    <td> int
    <td> Foreign key referencing m1Stock table.
    </tr>
    </table>

    <br>

    ```json
    {
      "message": "Success",
      "data": [
        {
          "m2Id": 1,
          "m2Ticker": "CSOL",
          "m2Date": "2024-12-19T18:30:00.000Z",
          "m2Open": "0.01",
          "m2High": "0.02",
          "m2Low": "0.01",
          "m2Close": "0.02",
          "m2Volume": "16257",
          "m2AdjOpen": "0.01",
          "m2AdjHigh": "0.02",
          "m2AdjLow": "0.01",
          "m2AdjClose": "0.02",
          "m2AdjVolume": "16257",
          "m2SplitFactor": "1.00",
          "m2M1Id": 18
        },
        {
          "m2Id": 3,
          "m2Ticker": "CUGPX",
          "m2Date": "2024-10-03T18:30:00.000Z",
          "m2Open": "16.55",
          "m2High": "16.55",
          "m2Low": "16.55",
          "m2Close": "16.55",
          "m2AdjOpen": "16.55",
          "m2AdjHigh": "16.55",
          "m2AdjLow": "16.55",
          "m2AdjClose": "16.55",
          "m2SplitFactor": "1.00",
          "m2M1Id": 31
        }
      ],
      "status": 200
    }
    ```

    OR With QUERY PARAMS

    ```json
    {
      "message": "Success",
      "data": [
        {
          "m2Id": 1,
          "m2Ticker": "CSOL",
          "m2Date": "2024-12-19T18:30:00.000Z",
          "m2Open": "0.01",
          "m2High": "0.02",
          "m2Low": "0.01",
          "m2Close": "0.02",
          "m2Volume": "16257",
          "m2AdjOpen": "0.01",
          "m2AdjHigh": "0.02",
          "m2AdjLow": "0.01",
          "m2AdjClose": "0.02",
          "m2AdjVolume": "16257",
          "m2SplitFactor": "1.00",
          "m2M1Id": 18
        }
      ],
      "status": 200
    }
    ```

<br>

### News Endpoints

<br>

1.  HOST:PORT/newsFeed/newsFeeds?ticker= - get All Or Selected ticker news available within the DB ( Premium subscription of Tiingo is required to obtain data from Tiingo Servers) as an array of JSON objects below example describes the one element of JSON object array<br>

eg:- <br>
Requset = localhost:3000/newsFeed/newsFeeds
<br>OR<br>
Requset = localhost:3000/newsFeed/newsFeeds?ticker=CSOL

<br>

<table>
<th> Field Name
<th> JSON Field
<th> Data Type
<th> Description
<tr>
<tr>
<td> Id
<td> m3Id
<td> int
<td> Database ID
</tr>
<tr>
<td> Article ID
<td> m3ArticleId
<td> string
<td> Unique identifier for the article
</tr>
<tr>
<td> Title
<td> m3Title
<td> string
<td> Title of the article
</tr>
<tr>
<td> URL
<td> m3Url
<td> string
<td> URL of the article
</tr>
<tr>
<td> Description
<td> m3Description
<td> string
<td> Description of the article
</tr>
<tr>
<td> Published Date
<td> m3PublishedDate
<td> string
<td> Published date of the article
</tr>
<tr>
<td> Crawl Date
<td> m3CrawlDate
<td> string
<td> Date the article was crawled
</tr>
<tr>
<td> Source
<td> m3Source
<td> string
<td> Source of the article
</tr>
<tr>
<td> Tickers
<td> m3Tickers
<td> string
<td> Tickers associated with the article
</tr>
<tr>
<td> Tags
<td> m3Tags
<td> array of strings
<td> Tags associated with the article
</tr>
</table>

```json
{
  "data": [
    {
      "m3Id": 15063835,
      "m3ArticleId": "aapl",
      "m3Url": "https://www.cnbc.com/2019/01/29/apples-ceo-sees-optimism-as-trade-tension-between-us-and-china-lessens.html",
      "m3Description": "Apple CEO Tim Cook told CNBC that trade tensions between the U.S. and China have improved since late December.",
      "m3PublishedDate": "2019-01-29T16:47:00.000Z",
      "m3CrawlDate": "2019-01-29T16:50:01.696Z",
      "m3Source": "cnbc.com",
      "m3Tickers": "AAPL",
      "m3Tags": [
        "China",
        "Economic Measures",
        "Economics",
        "Markets",
        "Stock",
        "Technology",
        "Tiingo Top",
        "Trade"
      ]
    }
  ],
  "message": "Success"
}
```
