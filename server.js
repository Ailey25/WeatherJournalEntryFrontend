const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('./webpack.config.js');

const app = express();
const port = process.env.PORT || 4000;
const runningMessage = 'Server is running on port ' + port;

app.use(webpackMiddleware(webpack(webpackConfig)));

app.get('/', (req, res) => {
  console.log('API was successfully requested');
  res.send(runningMessage);
});

app.listen(port, () => {
  console.log(runningMessage);
});
