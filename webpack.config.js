const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',

    devtool: 'inline-source-map',

    entry: path.resolve(__dirname, './src/app/index.js'), // webpack entry point - the module to start building dependency graph

    output: {
        path: path.resolve(__dirname, 'dist'), // folder to store bundle
        filename: '[name].bundle.js' // name of bundle
    },

    devServer: {
        contentBase: './dist', // source of static assets
        port: 8080
    },

    module: { // where we defined file patterns and their loaders
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: [
                    /node_modules/
                ]
            },
            {
                test: /\.(sass|scss)$/,
                use: [{
                    loader: "style-loader" // injects CSS
                }, {
                    loader: "css-loader" // translates CSS into a JS module
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
            }
        ]
    },

    plugins: [ // array of plugins to apply to build chunk
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './public/index.html'),
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
        new CleanWebpackPlugin(['dist'], {
            'verbose': true // write logs to console
        })
    ]
};
