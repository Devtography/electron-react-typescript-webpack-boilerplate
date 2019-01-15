const lodash = require('lodash');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

function joinPaths(src) {
  return path.join(__dirname, src);
}

// #region Common settings
const mode =
  process.env.NODE_ENV === 'production' ? 'production' : 'development';

const node = { __dirname: false, __filename: false };

const resolve = {
  alias: {
    '@': joinPaths('src'),
    '@mail': joinPaths('src/main'),
    '@models': joinPaths('src/models'),
    '@public': joinPaths('public'),
    '@renderer': joinPaths('src/renderer'),
    '@utils': joinPaths('src/utils'),
  },
  extensions: ['.css', '.scss', '.js', '.json', '.ts', '.tsx'],
};

const commonModules = {
  rules: [
    {
      test: /\.(ts|tsx)$/,
      exclude: /node_modules/,
      loader: 'ts-loader',
    },
    {
      test: /\.(jpg|png|svg|ico)$/,
      loader: 'file-loader',
      options: {
        name: '[path][name].[ext]',
      },
    },
  ],
};
// #endregion

const mainConfig = {
  entry: './src/main/main.ts',
  mode,
  target: 'electron-main',
  output: {
    filename: 'main.bundle.js',
    path: joinPaths('dist'),
  },
  node,
  resolve,
  module: commonModules,
};

const rendererConfig = {
  entry: './src/renderer/renderer.tsx',
  mode,
  target: 'electron-renderer',
  output: {
    filename: 'renderer.bundle.js',
    path: joinPaths('dist'),
  },
  node,
  resolve,
  module: (function () { 
    const rendererModules = lodash.cloneDeep(commonModules);
    rendererModules.rules.push(
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader'],
      }
    );

    return rendererModules;
  })(),
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html'),
    }),
  ],
};

module.exports = [mainConfig, rendererConfig];
