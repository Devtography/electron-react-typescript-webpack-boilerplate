const merge = require('webpack-merge');
const baseConfig = require('./webpack.common.js');

module.exports = [
    merge(baseConfig[0], {
        mode: 'development'
    }),
    merge(baseConfig[1], {
        mode: 'development'
    })];