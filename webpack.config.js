const path = require('path');
const {getEntries} = require('./projectConfig');

const {
    getDevServerConfig,
    getOptimizationParams,
    getPlugins,
    getOutputConfig,
    getHtmlLoader,
    getCssLoader,
    getSassLoader,
    getJsLoader,
    getImageFileLoader,
    getFontsLoader,
    getTSLoader,
    getVueLoader,
} = require('./configurations/build-configurations');

const isProd = process.env.NODE_ENV === 'production';
const {SRC} = getEntries();

module.exports = {
    context: SRC,
    mode: process.env.NODE_ENV,
    entry: './main.ts',
    output: getOutputConfig(),
    devServer: getDevServerConfig(),
    optimization: getOptimizationParams(),
    plugins: getPlugins(),
    devtool: isProd ? false : 'source-map',
    resolve: {
        extensions: [ '.tsx', '.ts', '.js', '.vue' ],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
        }
    },
    module: {
        rules: [
            getHtmlLoader(),
            getCssLoader(),
            getSassLoader(),
            getImageFileLoader(),
            getFontsLoader(),
            getTSLoader(),
            getVueLoader(),
            getJsLoader(),
        ]
    }
};
