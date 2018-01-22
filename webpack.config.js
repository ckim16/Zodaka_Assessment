module.exports = {
  entry: './client/src/index.js', // entry file for webpack
  output: { // output filename with path
    path: __dirname,
    filename: 'bundle.js'
  },
  module: { // module that needs to be tested when compiled
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }, 
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  devServer: { // serve client folder
    contentBase: './client'
  }
};