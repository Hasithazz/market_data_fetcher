const express = require('express');
const newsFeedController = require('../controllers/newsFeedController');

const router = express.Router();


router.get('/newsFeeds?', newsFeedController.getTickerNewsFeed);

module.exports = router;
