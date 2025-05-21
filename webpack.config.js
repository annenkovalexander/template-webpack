const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
  entry: path.resolve(__dirname, './src/index.tsx'),
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.html$/i,
        use: [{
          loader: 'html-loader',
          options: {
            sources: {
              list: [
                '...',
                {
                  tag: 'script',
                  attribute: 'src',
                  type: 'src',
                  filter: (tag) => {
                    // tag is a string path, not an HTML element
                    return tag.endsWith('.js');
                  }
                }
              ]
            }
          }
        }],
      },
      {
        test: /\.(png|jpg|jpeg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext][query]'
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(ts)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader'
        }
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\module\.((c|sa|sc)ss)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.module\.css$/i,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2)$/,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new ESLintPlugin({
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new Dotenv()
  ],
  resolve: {
    extensions: [
      '*',
      '.js',
      '.jsx',
      '.ts',
      '.tsx',
      '.json',
      '.css',
      '.scss',
      '.png',
      '.jpg'
    ]
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
    publicPath: process.env.PUBLIC_PATH ? process.env.PUBLIC_PATH : '/'
  },
  devServer: {
    static: path.join(__dirname, './dist'),
    compress: true,
    historyApiFallback: true,
    port: 4001
  }
};
