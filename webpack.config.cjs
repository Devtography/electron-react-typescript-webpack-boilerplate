const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { merge } = require('webpack-merge');

function srcPaths(src) {
  return path.join(__dirname, src);
}

const isEnvProduction = process.env.NODE_ENV === 'production';
const isEnvDevelopment = process.env.NODE_ENV === 'development';

const commonConfig = {
  devtool: isEnvDevelopment ? 'source-map' : false,
  mode: isEnvProduction ? 'production' : 'development',
  output: { path: srcPaths('dist') },
  node: { __dirname: false, __filename: false },
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx'],
    plugins: [new TsconfigPathsPlugin({
      configFile: './tsconfig.json',
      extensions: ['.js', '.json', '.ts', '.tsx'],
    })],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpg|png|svg|ico|icns)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
    ],
  },
};

const mainConfig = merge(commonConfig, {
  entry: './src/main/main.ts',
  target: 'electron-main',
  output: { filename: 'main.bundle.js' },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'package.json',
          to: 'package.json',
          transform: (content, _path) => {
            const jsonContent = JSON.parse(content);
            const electronVersion = jsonContent.devDependencies.electron;

            delete jsonContent.devDependencies;
            delete jsonContent.optionalDependencies;
            delete jsonContent.scripts;
            delete jsonContent.build;

            jsonContent.main = './main.bundle.js';
            jsonContent.scripts = { start: 'electron ./main.bundle.js' };
            jsonContent.devDependencies = { electron: electronVersion };

            return JSON.stringify(jsonContent, undefined, 2);
          },
        },
      ],
    }),
  ],
});

const preloadConfig = merge(commonConfig, {
  entry: './src/preload/preload.ts',
  target: 'electron-preload',
  output: { filename: 'preload.bundle.js' },
});

const rendererConfig = merge(commonConfig, {
  entry: './src/renderer/renderer.tsx',
  target: 'electron-renderer',
  output: { filename: 'renderer.bundle.js' },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html'),
    }),
  ],
});

module.exports = [mainConfig, preloadConfig, rendererConfig];
