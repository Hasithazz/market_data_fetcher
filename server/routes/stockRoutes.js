const express = require('express');
const stockController = require('../controllers/stockController');

const router = express.Router();

router.get('/stock/:ticker', stockController.getStock);
router.get('/stock/price/:ticker', stockController.getStockPriceEod);

module.exports = router;
