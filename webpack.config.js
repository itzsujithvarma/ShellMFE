const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const deps = require('./package.json').dependencies;
module.exports = {
    devtool: "eval-cheap-source-map",
    mode: "development",
    devServer: {
        port: 8088
    },
    entry: "/src/index.js", // main js
    module: {
        rules: [
            {
                test: /\.?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                    },
                },
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader", // for styles
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html", // base html
        }),
        new ModuleFederationPlugin({
            name: 'shell',
            remotes: {
                meals: 'meals@https://itzsujithvarma.github.io/MealsMFE/remoteEntry.js',
                header: 'header@https://itzsujithvarma.github.io/HeaderMFE/remoteEntry.js',
                cart: 'cart@https://itzsujithvarma.github.io/CartMFE/remoteEntry.js',
                order: 'order@https://itzsujithvarma.github.io/OrderMFE/remoteEntry.js',
            },
            shared: {
                ...deps,
                react: {
                    singleton: true,
                    requiredVersion: deps.react,
                },
                'react-dom': {
                    singleton: true,
                    requiredVersion: deps['react-dom'],
                },
            }
        })
    ],
};