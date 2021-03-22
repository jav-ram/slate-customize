var path = require('path');
let webpack = require("webpack");

module.exports = {
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader?cacheDirectory=true',
                }
            },
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: ExtractCssChunks.loader,
                        options: { hot: true }
                    },
                    {
                        loader: "css-loader", //generating unique classname
                        options: {
                        importLoaders: 1, // if specifying more loaders
                        modules: true,
                        sourceMap: false,
                        localIdentName: "[path]___[name]__[local]___[hash:base64:5]" //babel-plugin-css-module format
                        //localIdentName: "[path][name]__[local]" //recommended settings by cssloader#local-scope , this option generate unique classname for compiled css
                        }
                    }
                ]
            },
        ]
    }
};