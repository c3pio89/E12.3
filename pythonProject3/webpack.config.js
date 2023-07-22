const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js'
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin( {
           template: "./src/index.pug",
           filename: "index.html"
        })
    ],
    module: {
        rules: [
            {
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
                test: /\.css$/
            },
            {
                test: /\.pug$/,
                use: 'pug-loader',
            }
        ]
    }
};