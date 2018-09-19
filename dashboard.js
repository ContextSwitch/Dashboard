const express = require('express')
const path = require('path');
const app = express();
const routes = require('./routes');
const staticAssetsPath = path.resolve(__dirname, 'build');
require('./models');

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://54.210.221.137');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


app.engine('html', require('ejs').renderFile);
app.use('/', routes); //Main entry point
app.set('views', './src')
app.use(express.static(staticAssetsPath));




app.listen(8000, () => {
  console.log('app listening on port 8000!')
});
