const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

let mainConfig = {
    entry: './src/main/main.ts',
    target: 'electron-main',
    output: {
        filename: 'main.bundle.js',
        path: __dirname + '/dist',
    },
    node: {
        __dirname: false,
        __filename: false,
    },
    resolve: {
        alias: {
            '~': path.join(__dirname, 'src')
        },
        extensions: ['.js', '.json', '.ts'],
    },
    module: {
        rules: [
            {
                // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
                test: /\.(ts)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                },
            },
            {
                test: /\.(jpg|png|svg|ico|icns)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                },
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                },
            },
        ],
    },
};

let rendererConfig = {
    entry: './src/renderer/renderer.tsx',
    target: 'electron-renderer',
    output: {
        filename: 'renderer.bundle.js',
        path: __dirname + '/dist',
    },
    node: {
        __dirname: false,
        __filename: false,
    },
    resolve: {
        alias: {
            '~': path.join(__dirname, 'src')
        },
        extensions: ['.js', '.json', '.ts', '.tsx'],
    },
    module: {
        rules: [
            {
                // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                },
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    'css-loader?sourceMap',
                ],
            },
            {
                test: /\.(jpg|png|svg|ico|icns)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                },
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/renderer/index.html'),
        }),
    ],
};

module.exports = [mainConfig, rendererConfig];