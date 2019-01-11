const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, '/src/app/index.js'), // webpack entry point. Module to start building dependency graph

    output: {
        path: path.resolve(__dirname, '/public/'), // folder to store bundle
        filename: 'bundle.js', // name of bundle
        publicPath: '/' // public URL of the output directory when referenced in a browser
    },

    devServer: {
        contentBase: './public/', // source of static assets
        port: 7700
    },

    module: { // where we defined file patterns and their loaders
        rules: []
    },

    plugins: [ // array of plugins to apply to build chunk
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '/public/index.html'),
            inject: 'body'
        }),

        // make sure we allow any jquery usages outside of our webpack modules
        // new webpack.ProvidePlugin({
        //     $: "jquery",
        //     jQuery: "jquery",
        //     'window.$': "jquery",
        //     'window.jQuery': "jquery"
        // }),

        // clean dist folder
        new CleanWebpackPlugin(['./public/'], {
            'verbose': true // write logs to console
        }),

        new webpack.NoEmitOnErrorsPlugin() // avoid publishing when compilation failed
    ]
};
