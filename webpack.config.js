var path = require('path');
var webpack = require('webpack');

var config = {
    context: path.join(__dirname, 'src'),
    entry: './index',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'static/bundle.js'
    },
    devtools: 'sourcemap',
    plugins: [],
    module: {
        loaders: [
            {test: /\.css$/, loader: 'style!css'},
            {test: /\.js$/,  loader: 'babel'},
            {test: /\.less$/,loader: "style!css!less?strictMath&cleancss"},
            {
                test: /\.(eot|woff|ttf|svg|png|jpg|gif|woff|woff2)$/,
                loader: 'url?limit=30000&name=[name]-[hash].[ext]'
            },
        ]
    }

};

module.exports = config;