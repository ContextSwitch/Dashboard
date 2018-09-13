const express = require('express')
const path = require('path');
const app = express();
const routes = require('./controllers');
const staticAssetsPath = path.resolve(__dirname, 'build');
require('./models');

app.engine('html', require('ejs').renderFile);
app.use('/', routes); //Main entry point
app.set('views', './src')
app.use(express.static(staticAssetsPath));





app.listen(8000, () => {
  console.log('app listening on port 8000!')
});
