const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        app: [
            './client/index',
            'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&overlay=false&reload=true'
        ]
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'public'),
        publicPath: '/'
    },
    resolve: {
        modules: [
            'node_modules',
        ],
        extensions: ['.js', '.jsx', '.json']
    },
    module: {
        rules: [{
            test: /\.m?js(x)?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }]
    },
    plugins: [
        new CleanWebpackPlugin(['public']),
        new HtmlWebpackPlugin({
            title: 'Mern',
            template: path.resolve(__dirname, 'client', 'index.html'),
            filename: 'index.html'
        })
    ]
}
