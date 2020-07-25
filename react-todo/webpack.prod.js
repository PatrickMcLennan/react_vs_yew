const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ScriptExtWebpackPlugin = require("script-ext-html-webpack-plugin");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
  plugins: [
    new CleanWebpackPlugin({}),
    new HtmlWebpackPlugin({
      template: `./template.html`,
      inject: `head`,
    }),
    new ScriptExtWebpackPlugin({
      defaultAttribute: `defer`,
    }),
    new MiniCssExtractPlugin({
      filename: `styles.[hash].css`,
    }),
  ],
});
