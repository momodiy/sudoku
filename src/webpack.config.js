/*
* Author: stevenlee
* Date: 2018/6/20
* Description: ... 
*/

module.exports = {
  entry: {
    index: './js/index'
  },
  output: {
    filename: '[name].js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
}
