const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssoWebpackPlugin = require('csso-webpack-plugin').default;

module.exports = (env, argv) => ({
  entry: './src/index.jsx',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          argv.mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
        ],
        sideEffects: true,
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              emitFile: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', 'css'],
  },
  output: {
    path: `${__dirname}/dist`,
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: './dist',
    port: 1234,
    allowedHosts: [
      'local.debug',
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new Dotenv({
      systemvars: true,
    }),
    new CssoWebpackPlugin(),
  ],
});
