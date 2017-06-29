var path = require('path');

module.exports = {
    context: path.join(__dirname, "src/client"),
    devtool: "inline-source-map",
    entry: "./index.js",
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-0'],
                    plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties'],
                }
            }
        ]
    },
    output: {
        path: path.join(__dirname, "output"),
        filename: "client.js"
    }
};