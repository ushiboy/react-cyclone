module.exports = {
  entry: {
    app: './src/index.js'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.html$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      }
    ]
  },
  devServer: {
    contentBase: './src',
    inline: true,
    host: '0.0.0.0',
    port: 8080,
    disableHostCheck: true,
    historyApiFallback: true,
    stats: {
      version: false,
      hash: false,
      chunkModules: false
    }
  },
  devtool: 'source-map'
};
