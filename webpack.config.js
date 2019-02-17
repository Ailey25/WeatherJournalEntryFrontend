const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const envFile = process.env.NODE_ENV === 'development'
  ? '/.env.development'
  : '/.env.production';
const dotenv = require('dotenv').config({path: __dirname + envFile});

module.export = {
  API_URL: process.env.API_URL
}

const mode = process.env.NODE_ENV === 'development'
  ? 'development'
  : 'production';
module.exports = {
  entry: [
    path.resolve(__dirname, 'src/index')
  ],
  devtool: "cheap-module-source-map",
  mode: mode,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, "public/"),
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3000,
    publicPath: "http://localhost:3000/public",
    hotOnly: true,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      inject: false
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.API_URL': JSON.stringify(process.env.API_URL),
    }),
  ]
};
