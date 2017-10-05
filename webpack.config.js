const debug = process.env.NODE_ENV !== 'production';

const webpack = require('webpack');
const WebpackNodeExternals = require('webpack-node-externals');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const dist = path.join(__dirname, 'build');
const distClient = path.join(__dirname, 'build', 'static');
const src = path.join(__dirname, 'src');
const serverSrc = path.join(__dirname, 'api');


console.log(process.env.NODE_ENV);

module.exports = [

    //client
    {
        context: src,
        name: 'client',
        devtool: debug ? 'source-map' : false,
        entry: {
            app: './index.js',
            vendor: ['react', 'react-dom']
        },
        module: {
            loaders: [
                {
                    test: /\.js?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                }
            ]
        },
        output:{
            path: distClient,
            filename: 'script.min.js'
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: 'index.html'
            }),
            new webpack.optimize.CommonsChunkPlugin({ name: "vendor", filename: "vendor.min.js" })
        ]
    },

    //server
    {
        context: path.join(__dirname, './api'),
        name: 'server',
        entry: serverSrc,
        target: 'node',
        externals: [WebpackNodeExternals()],
        devtool: debug ? 'source-map' : false,
        output: {
            path: dist,
            filename: 'server.js',
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader'
                }
            ]
        }
    }
]