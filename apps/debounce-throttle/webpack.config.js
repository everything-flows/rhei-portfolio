const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    // debounce
    "debounce/leading": "./src/routes/debounce/leading/index.ts",
    "debounce/trailing": "./src/routes/debounce/trailing/index.ts",
    "debounce/leading-trailing":
      "./src/routes/debounce/leading-trailing/index.ts",

    // throttle
    "throttle/leading": "./src/routes/throttle/leading/index.ts",
    "throttle/trailing": "./src/routes/throttle/trailing/index.ts",
    "throttle/leading-trailing":
      "./src/routes/throttle/leading-trailing/index.ts",
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
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/routes/index.html",
      filename: "index.html",
      chunks: ["index"],
      inject: true,
    }),

    // debounce
    new HtmlWebpackPlugin({
      template: "./src/routes/debounce/index.html",
      filename: "debounce/index.html",
      chunks: ["debounce"],
      inject: true,
    }),
    new HtmlWebpackPlugin({
      template: "./src/routes/debounce/leading/index.html",
      filename: "debounce/leading/index.html",
      chunks: ["debounce/leading"],
      inject: true,
    }),
    new HtmlWebpackPlugin({
      template: "./src/routes/debounce/trailing/index.html",
      filename: "debounce/trailing/index.html",
      chunks: ["debounce/trailing"],
      inject: true,
    }),
    new HtmlWebpackPlugin({
      template: "./src/routes/debounce/leading-trailing/index.html",
      filename: "debounce/leading-trailing/index.html",
      chunks: ["debounce/leading-trailing"],
      inject: true,
    }),

    // throttle
    new HtmlWebpackPlugin({
      template: "./src/routes/throttle/index.html",
      filename: "throttle/index.html",
      chunks: ["throttle"],
      inject: true,
    }),
    new HtmlWebpackPlugin({
      template: "./src/routes/throttle/leading/index.html",
      filename: "throttle/leading/index.html",
      chunks: ["throttle/leading"],
      inject: true,
    }),
    new HtmlWebpackPlugin({
      template: "./src/routes/throttle/trailing/index.html",
      filename: "throttle/trailing/index.html",
      chunks: ["throttle/trailing"],
      inject: true,
    }),
    new HtmlWebpackPlugin({
      template: "./src/routes/throttle/leading-trailing/index.html",
      filename: "throttle/leading-trailing/index.html",
      chunks: ["throttle/leading-trailing"],
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
