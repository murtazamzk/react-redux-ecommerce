/**
 * Development Webpack Configuration
 */

let Dotenv = require('dotenv-webpack');
let { resolve } = require('path');

let webpack = require('webpack');
let DashboardPlugin = require('webpack-dashboard/plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

let CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {

  devtool: 'cheap-module-eval-source-map',

  context: resolve(__dirname, 'src'),

  entry: [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://${process.env.NODE_HOST || 'localhost'}:${process.env.NODE_PORT || 8111}`,
    './'
  ],

  output: {
    filename: 'app-[hash].js',
    path: resolve(__dirname, 'build'),
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'postcss-loader',
            { loader: 'sass-loader', query: { sourceMap: false } }
          ],
        }),
      },
      { test: /\.(png|jpg|gif)$/, use: 'url-loader?limit=15000&name=[name]-[hash].[ext]' },
      { test: /\.eot(\?v=\d+.\d+.\d+)?$/, use: 'file-loader' },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/, use: 'url-loader?limit=10000&mimetype=application/octet-stream' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=10000&mimetype=image/svg+xml' }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    alias: {
      variables: resolve(__dirname, 'src/scss/utils/variables'),
      mixins: resolve(__dirname, 'src/scss/utils/mixins'),
      respond: resolve(__dirname, 'src/scss/utils/respond')
    }
  },

  devServer: {
    host: process.env.NODE_HOST || 'localhost',
    port: process.env.NODE_PORT || 8111,
    contentBase: resolve(__dirname, 'build'),
    publicPath: '/',
    historyApiFallback: true,
    hot: true,
    noInfo: false,
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      timings: true,
      version: false,
      warnings: true,
      colors: true
    },
    proxy: {
      '/products': 'http://localhost:3000'
    }
  },

  plugins: [
    new Dotenv({
      path: './.env',
      safe: true
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new HtmlWebpackPlugin({
      template: `${__dirname}/src/index.html`,
      filename: 'index.html',
      inject: 'body',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new DashboardPlugin(),
    new ExtractTextPlugin({ filename: 'app-[hash].css', disable: false, allChunks: true }),
    new CopyWebpackPlugin([
      {from:`${__dirname}/src/products`,to:'products'},
      {from:`${__dirname}/src/img`,to:'img'}
    ]),
  ]

}
