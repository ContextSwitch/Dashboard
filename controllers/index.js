console.log('in routes');
const router = require('express').Router();
//const user = require('./user');
//const admin = require('./admin'); 


router.get('/', (req, res) => {
    res.send('Welcome to the dashboard API');
});

router.get('/addRss', (req, res) => {

  res.send('adding RSS!')

});

module.exports = router;
