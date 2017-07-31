var path = require('path');
var nodeExternals = require('webpack-node-externals');

var LOADERS = [{
    test: /\.jsx?$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'babel-loader',
    query: {
        presets: ['react', 'es2015', 'stage-0'],
        plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties'],
    }
}, {
    test: /\.json$/,
    loader: 'json-loader'
}];

module.exports = [{
    devtool: "inline-source-map",
    entry: "./src/client/index.js",
    module: {
        loaders: LOADERS
    },
    output: {
        path: path.join(__dirname, "output"),
        filename: "client.js"
    }
}, {
    target: "node",
    externals: [nodeExternals()],
    devtool: "inline-source-map",
    entry: "./src/server/app.js",
    module: {
        loaders: LOADERS
    },
    output: {
        path: path.join(__dirname, "output"),
        filename: "server.js"
    }
}];