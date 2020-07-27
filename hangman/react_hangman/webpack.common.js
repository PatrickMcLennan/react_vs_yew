const path = require("path");

module.exports = {
  entry: path.resolve("index.ts"),
  output: {
    path: path.resolve(`dist`),
    filename: `app.[hash].js`,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "swc-loader",
        },
      },
    ],
  },
  resolve: {
    extensions: [`.js`, `.ts`, `.tsx`],
  },
};
