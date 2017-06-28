var webpack = require("webpack");
var path = require("path");
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
module.exports = {
    entry: {
        index: './dev/index', //我们开发时的入口文件
    /*    router: './dev/router',
        router2: './dev/router2',
        ensure: './dev/ensure',*/
        state: './dev/state'
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].js",
        publicPath:"dist/", //给require.ensure用
        chunkFilename: "[name].chunk.js"//给require.ensure用
    }, //页面引用的文件
    module: {
        loaders: [
            {test: /\.css$/, loader: 'style-loader!css-loader'}
        ],
        preLoaders: [
            {test: /\.js$/, loader: "amdcss-loader"}
        ]
    },
    plugins: [commonsPlugin],
    resolve: {
        extensions: ['.js', "", ".css"],
        alias: {
            jquery: path.join(__dirname, 'dev/jquery/jquery.js'),
            avalon: path.join(__dirname, 'dev/avalon/avalon.shim'), //在正常情况下我们以CommonJS风格引用avalon,以require('avalon')
            '../avalon': path.join(__dirname, 'dev/avalon/avalon.js')//由于oniui都以是../avalon来引用avalon的，需要在这里进行别名
        }
    }
}