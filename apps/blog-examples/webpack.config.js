const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    "string-units": "./src/routes/string-units/index.tsx",
    "utf8-encoding": "./src/routes/utf8-encoding/index.tsx",
    "callback-hell-sync": "./src/routes/callback-hell-sync/index.tsx",
    "callback-hell-async": "./src/routes/callback-hell-async/index.tsx",
    "ipc-demo": "./src/routes/ipc-demo/index.tsx",
    "reflow-demo": "./src/routes/reflow-demo/index.tsx",
    "mmu-demo": "./src/routes/mmu-demo/index.tsx",
    "page-replacement-demo": "./src/routes/page-replacement-demo/index.tsx",
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
    new HtmlWebpackPlugin({
      template: "./src/routes/callback-hell-sync/index.html",
      filename: "callback-hell-sync/index.html",
      chunks: ["callback-hell-sync"],
      inject: true,
    }),
    new HtmlWebpackPlugin({
      template: "./src/routes/callback-hell-async/index.html",
      filename: "callback-hell-async/index.html",
      chunks: ["callback-hell-async"],
      inject: true,
    }),
    new HtmlWebpackPlugin({
      template: "./src/routes/ipc-demo/index.html",
      filename: "ipc-demo/index.html",
      chunks: ["ipc-demo"],
      inject: true,
    }),
    new HtmlWebpackPlugin({
      template: "./src/routes/reflow-demo/index.html",
      filename: "reflow-demo/index.html",
      chunks: ["reflow-demo"],
      inject: true,
    }),
    new HtmlWebpackPlugin({
      template: "./src/routes/mmu-demo/index.html",
      filename: "mmu-demo/index.html",
      chunks: ["mmu-demo"],
      inject: true,
    }),
    new HtmlWebpackPlugin({
      template: "./src/routes/page-replacement-demo/index.html",
      filename: "page-replacement-demo/index.html",
      chunks: ["page-replacement-demo"],
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
