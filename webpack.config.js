const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
const path = require('path');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env, agrv) => {
  const isDev = agrv.mode === 'development';
  const isAnalyze = env && env.analyze;

  const basePlugins = [
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      favicon: './src/assets/images/favicon.ico',
      hash: true,
    }),
    new MiniCssExtractPlugin({
      filename: isDev ? '[name].css' : 'static/css/[name].[hash:8].css',
    }),
    new webpack.ProgressPlugin(),
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify('production'),
    // }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
  ];
  let prodPlugins = [
    ...basePlugins,
    new CleanWebpackPlugin(),
    new CompressionPlugin({
      test: /\.(css|js|html|svg)$/,
    }),
  ];
  if (isAnalyze) {
    prodPlugins = [...prodPlugins, new BundleAnalyzerPlugin()];
  }

  return {
    mode: isDev ? 'development' : 'production',
    entry: './src/index.tsx',
    output: {
      path: path.resolve('build'),
      publicPath: '/',
      filename: 'static/js/main.[hash:8].js',
    },
    devServer: {
      historyApiFallback: true,
      watchContentBase: true,
      contentBase: 'public',
      inline: true,
      port: 10000,
      hot: true,
    },
    optimization: {
      emitOnErrors: true,
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
      alias: {
        '@': path.resolve('src'),
      },
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.(ts|tsx)$/,
          use: {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
          exclude: [/node_modules/],
        },
        {
          test: /\.(css|scss)$/,
          use: [
            {loader: 'style-loader'},
            {loader: 'css-loader'},
            {
              loader: 'sass-loader',
              options: {
                sassOptions: {
                  javascriptEnabled: true,
                },
              },
            },
          ],
        },
        {
          test: /\.less$/i,
          use: [
            {loader: 'style-loader'},
            {loader: 'css-loader'},
            {
              loader: 'less-loader',
              options: {
                lessOptions: {
                  javascriptEnabled: true,
                },
              },
            },
          ],
        },
        {
          test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: isDev
                  ? '[path][name].[ext]'
                  : 'static/media/[name].[hash:8].[ext]',
              },
            },
          ],
        },
        {
          test: /\.(eot|ttf|woff|woff2)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: isDev
                  ? '[path][name].[ext]'
                  : 'static/fonts/[name].[ext]',
              },
            },
          ],
        },
      ],
    },
    devtool: isDev ? 'inline-source-map' : false,
    plugins: isDev ? basePlugins : prodPlugins,
    performance: {
      maxEntrypointSize: 800000,
    },
  };
};
