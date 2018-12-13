/* webpack.config.js implements the configuration for webpack 
 * by including the appropriate loaders and optimizations
 *
 * Authors: Justin Baskaran, Gavin Martin, Ian Christensen
 * Professor: Keith Vander Linden
 * Class: CS-336-A, for Calvin College
 * Semester: Fall, 2018
 */

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: [
        __dirname + '/public/scripts/index.js'
    ],
    output: {
        path: __dirname + '/dist',
        filename: '/bundle.js'
    },
    module: {
        rules:[
            {
                test:/\.css$/,
                use:[
                {loader: "style-loader"},
                {loader: "css-loader"}
                ]
            }
       ],
        loaders: [
            { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" },
            { test: /\.css$/,  loader: 'style!css?modules!postcss' }
        ]
    },
    plugins: [
    new HtmlWebpackPlugin({template: __dirname + "/public/index.tmpl.html"}),
    new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        port: 3001,
        proxy: { '/api/*': 'http://localhost:3000' },
        colors: true,
        historyApiFallback: true,
        inline: true,
        hot: true
    }
};
