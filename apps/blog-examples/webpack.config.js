const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    "string-units": "./src/routes/string-units/index.tsx",
    "utf8-encoding": "./src/routes/utf8-encoding/index.tsx",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/routes/string-units/index.html",
      filename: "string-units/index.html",
      chunks: ["string-units"],
      inject: true,
    }),
    new HtmlWebpackPlugin({
      template: "./src/routes/utf8-encoding/index.html",
      filename: "utf8-encoding/index.html",
      chunks: ["utf8-encoding"],
      inject: true,
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 3001,
    open: false,
    hot: true,
    historyApiFallback: false,
    client: {
      overlay: true,
    },
  },
};
