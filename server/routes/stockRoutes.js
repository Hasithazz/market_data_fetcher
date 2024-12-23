const express = require('express');
const stockController = require('../controllers/stockController');

const router = express.Router();

router.get('/stocks', stockController.getAllStocks);
router.get('/stock/:ticker', stockController.getStock);
router.get('/stocks/price', stockController.getAllStockPrices);
router.get('/stock/price/:ticker', stockController.getStockPriceEod);

module.exports = router;
