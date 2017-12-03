'use strict';

const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const autoprefixer = require('autoprefixer');

const yaml = require('js-yaml');
const fs = require('fs');

const EXPORT_VAR = 'gblib';

let jsConf = {
    name: 'js',
    context: __dirname + '/static/js/',
    entry: yaml.safeLoad(fs.readFileSync('static/js/bundles-config.yaml', 'utf8')),
    output: {
        path: __dirname + '/public/res/js/',
        publicPath: '/res/js/dev/',
        filename: '[name].js',
    },
    externals: {
        jQuery: 'jQuery',
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'EXPORT_VAR': JSON.stringify(EXPORT_VAR),
        })
    ],

    resolve: {
        extensions: ['.js'],
        modules: [
            path.resolve('./node_modules/'),
            path.resolve('./static/js/'),
        ]
    },

    resolveLoader: {
        modules: ['node_modules'],
        mainFields: ['loader', 'main'],
        extensions: ['.js']
    }
};

if (process.env.DEV_MODE !== 'prod') {
    jsConf = Object.assign(jsConf, {
        devtool: 'inline-module-source-map',
        watch: true,
        watchOptions: {
            aggregateTimeout: 100
        }
    });
}


let cssConf = {
    name: 'css',
    context: __dirname + '/static/sass/',
    entry: yaml.safeLoad(fs.readFileSync('static/sass/bundles-config.yaml', 'utf8')),

    output: {
        path: __dirname + '/public/res/css/',
        publicPath: '/public/res/css/',
        filename: '[name].css'
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new ExtractTextPlugin({
            filename: '[name].css',
            disable: false,
            allChunks: true
        }),
        // new OptimizeCssAssetsPlugin({
        //     assetNameRegExp: /.css$/g,
        //     cssProcessor: require('cssnano'),
        //     cssProcessorOptions: {discardComments: {removeAll: true}},
        //     canPrint: false
        // })
    ],

    module: {
        rules: [{
            test: /\.(sass|scss)$/,
            use: ExtractTextPlugin.extract([
                {loader: 'css-loader', options: {importLoaders: 1, sourceMap: true}},

                {
                    loader: 'postcss-loader',
                    options: {
                        plugins: [
                            autoprefixer({
                                browsers: ['ie >= 8', 'last 4 version']
                            })
                        ],
                        sourceMap: true
                    }
                },
                {
                    loader: 'sass-loader',
                    options: {
                        includePaths: [
                            path.resolve('./static/sass/'),
                            path.resolve('./node_modules/'),
                        ],
                        sourceMap: true
                    },
                },
            ])

        },
            {
                test: /\.(png|jpg|svg|jpeg)$/,
                // include: path.resolve('./public/res/img/'),

                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[path][name].[ext]',
                    }
                },
            }
        ],
    },

    watch: process.env.DEV_MODE !== 'prod'
};

console.log('DEV_MODE', process.env.DEV_MODE !== 'prod');

/**
 *
 */
module.exports = [jsConf, cssConf];
