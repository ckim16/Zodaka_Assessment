module.exports = {
  entry: './client/src/index.js', // entry file for webpack
  output: { // output filename with path that output file is going to be created
    path: __dirname,
    filename: 'bundle.js'
  },
  module: { // module that needs to be tested when compiled
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }, 
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  devServer: { 
    contentBase: './client' // serve client folder
  }
};