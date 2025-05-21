const nested = require('postcss-nested');
const autoprefixer = require('autoprefixer');
const containerQueries = require('cq-prolyfill/postcss-plugin');

module.exports = {
  plugins: [
    containerQueries,
    nested,
    autoprefixer,
  ],
};