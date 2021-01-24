const path = require('path');

const {getEntries} = require('../../projectConfig');
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack');

const isProd = process.env.NODE_ENV === 'production';

function getFileNameTemplate(ext) {
    return (isProd ? `[name].[contenthash].${ext}` : `[name].${ext}`);
}

function getHTMLWebpackPluginConfig() {
    return {
        template: `./index.html`,
        filename: 'index.html',
        minify: {
            collapseWhitespace: isProd
        }
    };
}

function getMiniCssExtractPluginConfig() {
    return {
        filename: `./css/${getFileNameTemplate('css')}`
    };
}

function getCopyWebpackPluginConfig() {
    const {ASSETS, DIST} = getEntries();

    return {
        patterns: [{from: ASSETS, to: DIST}]
    };
}

function getImageminPluginConfig() {
    return {
        bail: false,
        cache: true,
        imageminOptions: {
            plugins: [
                ['gifsicle', {interlaced: true}],
                ['jpegtran', {progressive: true}],
                ['optipng', {optimizationLevel: 5}],
                ['svgo', {plugins: [{removeViewBox: false}]}]
            ]
        }
    };
}

function getPlugins() {
    const basePlugins = [
        new HTMLWebpackPlugin(getHTMLWebpackPluginConfig()),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(getMiniCssExtractPluginConfig()),
        new CopyWebpackPlugin(getCopyWebpackPluginConfig())
    ];

    if (isProd) {
        basePlugins.push(new ImageminPlugin(getImageminPluginConfig()));
    }

    return basePlugins;
}

function getOptimizationParams() {
    const configObj = {
        splitChunks: {
            chunks: 'all'
        }
    };

    if (isProd) {
        configObj.minimizer = [
            new OptimizeCssAssetWebpackPlugin(),
            new TerserWebpackPlugin()
        ];
    }

    return configObj;
}

function getDevServerConfig() {
    return {
        historyApiFallback: true,
        contentBase: getEntries().DIST,
        open: true,
        compress: true,
        hot: true,
        port: 3000
    };
}

function getOutputConfig() {
    return {
        filename: `./${getFileNameTemplate('js')}`,
        path: path.resolve(__dirname, getEntries().DIST),
        publicPath: ''
    };
}

function getHtmlLoader() {
    return {
        test: /\.html$/,
        loader: 'html-loader'
    }
}

function getCssLoader() {
    return {
        test: /\.css$/i,
        use: [
            {
                loader: MiniCssExtractPlugin.loader,
                options: {
                    hmr: !isProd
                }
            },
            'css-loader'
        ]
    }
}

function getSassLoader() {
    return {
        test: /\.s[ac]ss$/,
        use: [
            {
                loader: MiniCssExtractPlugin.loader,
                options: {
                    publicPath: (resourcePath, context) => {
                        return path.relative(path.dirname(resourcePath), context) + '/';
                    }
                }
            },
            'css-loader',
            'sass-loader'
        ]
    }
}

function getJsLoader() {
    return {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
    }
}

function getImageFileLoader() {
    return {
        test: /\.(?:|gif|png|jpg|jpeg|svg)$/,
        use: [
            {
                loader: 'file-loader',
                options: {
                    name: `./${getFileNameTemplate('[ext]')}`
                }
            }
        ]
    }
}

function getFontsLoader() {
    return {
        test: /\.(?:|woff2)$/,
        use: [
            {
                loader: 'file-loader',
                options: {
                    name: `./${getFileNameTemplate('[ext]')}`
                }
            }
        ]
    }
}

function getTSLoader() {
    return {
        test: /\.tsx?$/,
        exclude: [/node_modules/],
        use: [
            {
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                }
            }
        ]
    }
}

function getVueLoader() {
    return {
        test: /\.vue$/,
        use: [
            {
                loader: 'vue-loader'
            }
        ]
    }
}

module.exports = {
    getEntries,
    getOptimizationParams,
    getPlugins,
    getDevServerConfig,
    getOutputConfig,
    getHtmlLoader,
    getCssLoader,
    getSassLoader,
    getJsLoader,
    getImageFileLoader,
    getFontsLoader,
    getTSLoader,
    getVueLoader
};
