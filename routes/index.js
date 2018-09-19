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

router.get('/getAllFeeds', async (req, res) => {

    let feeds = await FeedFactory.loadAll();


    res.send(JSON.stringify(feeds));

});

router.get('/getFeedContent', async (req, res) => {
    let feedId = req.query.feedId;
    let feed = await FeedFactory.load(feedId);
   
    feed.fetchContent();
    console.log(feed.content);
   

    res.send(JSON.stringify(feed));
});

module.exports = router;
