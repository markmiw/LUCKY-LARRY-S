const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, './client/src/index.jsx'),
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /.(png|jp(e*)g|svg|gif|)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[hash]-[name].[ext]',
            },
          },
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ]
  },
  resolve: {
    extensions: ['.jsx', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './client/dist'),
  },
};
