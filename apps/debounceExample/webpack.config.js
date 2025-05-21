const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    index: "./src/index.ts",
    leading: "./src/leading.ts",
    "leading-trailing": "./src/leading-trailing.ts",
    trailing: "./src/trailing.ts",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "index.html",
      chunks: ["index"],
      inject: true,
    }),
    new HtmlWebpackPlugin({
      template: "./leading.html",
      filename: "leading.html",
      chunks: ["leading"],
      inject: true,
    }),
    new HtmlWebpackPlugin({
      template: "./leading-trailing.html",
      filename: "leading-trailing.html",
      chunks: ["leading-trailing"],
      inject: true,
    }),
    new HtmlWebpackPlugin({
      template: "./trailing.html",
      filename: "trailing.html",
      chunks: ["trailing"],
      inject: true,
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: false,
    client: {
      overlay: true,
    },
  },
};
