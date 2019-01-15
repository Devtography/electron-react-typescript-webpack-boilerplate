const merge = require('webpack-merge');
const baseConfig = require('./webpack.common.js');

module.exports = [
  merge(baseConfig[0], {
    mode: 'production'
  }),
  merge(baseConfig[1], {
    mode: 'production'
  })];