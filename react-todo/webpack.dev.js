const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  devServer: {
    open: true,
    port: 3000,
    overlay: true,
    contentBase: "./dist",
    hot: true,
  },
  devtool: `source-maps`,
  plugins: [
    new HtmlWebpackPlugin({
      filename: `index.html`,
      template: path.resolve(__dirname, `template.html`),
      inject: `body`,
    }),
  ],
});
