const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || '8888';
// const nodeEnv = process.argv.indexOf('-p') !== -1 ? 'development' : 'production';

const sourcePath = path.join(__dirname, './src');
const staticsPath = path.join(__dirname, './dist');


const plugins = [
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'vendor.bundle.js',
        minChunks(module, count) {
            var context = module.context;
            return context && context.indexOf('node_modules') >= 0;
        },
    }),
];

let jsEntry = 'index.js';



plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
);


module.exports = {
    devtool: 'source-map',
    entry: {
        bundle: jsEntry,
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[name]-chunk.js',
        path: staticsPath,
        publicPath: './',
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: {
                    loader: 'file-loader',
                    query: {
                        name: '[name].[ext]'
                    }
                }
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        query: {
                            cacheDirectory: true,
                            presets: [['es2015', {modules: false}], 'react', 'stage-0'],
                            plugins: ['syntax-dynamic-import',]
                        }
                    }
                ]
            },
            {
                test: /\.(gif|png|jpg|jpeg\ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use: 'file-loader'
            }
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.scss'],
        modules: [
            sourcePath,
            'node_modules'
        ]
    },
    plugins: plugins,
    devServer: {
        contentBase: '.',
        publicPath: '/',
        historyApiFallback: true,
        port: PORT,
        host: HOST,
        hot: true,
        compress: false,
        stats: {
            colors: true,
            chunks: false, // be less verbose
        },
    },
    externals: {
        'cheerio': 'window',
        'react/addons': true, // important!!
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
    }
};
