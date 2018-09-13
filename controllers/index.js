const router = require('express').Router();
FeedFactory = require('../models/Feed.js');
//const user = require('./user');
//const admin = require('./admin'); 


router.get('/', (req, res) => {
    res.send('Welcome to the dashboard API');
});

router.get('/getFeed', async (req, res) => {

    let feedId = req.query.feedId;
    let feed = await FeedFactory.load(feedId);

    res.send(JSON.stringify(feed));

});

module.exports = router;
