const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

module.exports = {
    entry: path.join(__dirname, './src/js/index.js'),
    output: {
        filename: '[hash].js', // output filename
        path: path.join(__dirname, 'dist'), // path
    },
    devtool: 'inline-source-map',
    devServer: {
        hot: true, // hot update
        open: true, // open in browser
        port: '8080',
        static: {
            directory: path.join(__dirname, 'dist')
        }
    },
    module: { // add loaders
        rules: [
            { // css loader
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            // name of template
            filename: 'index.html',
            // template
            template: path.join(__dirname, './src/index.html'),
            minify: {
                collapseWhitespace: true
            },
            hash: true
        }),
        new CopyWebpackPlugin(
            {
                patterns: [
                    {
                        from: path.join(__dirname, './src/data.json'),
                        to: path.join(__dirname, './dist/data.json')
                    },
                    {
                        from: path.join(__dirname, './src/images'),
                        to: path.join(__dirname, './dist/images')
                    }
                ]
            }
        ),
        new CleanWebpackPlugin(),
    ],

}