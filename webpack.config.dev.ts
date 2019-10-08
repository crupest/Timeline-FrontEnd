import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

const config: webpack.Configuration = {
  entry: ["react-hot-loader/patch", "./src/index.tsx"],
  mode: "development",
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          plugins: ["react-hot-loader/babel"]
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192
            }
          },
          {
            loader: "image-webpack-loader"
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      "react-dom": "@hot-loader/react-dom"
    },
    extensions: ["*", ".js", ".jsx", ".ts", ".tsx"]
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all"
        }
      }
    }
  },
  output: {
    path: path.resolve(__dirname, "dist/"),
    filename: "[name].[hash].js",
    chunkFilename: "[name].[hash].js",
    publicPath: "/"
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    host: "0.0.0.0",
    port: 3000,
    publicPath: "http://localhost:3000/",
    historyApiFallback: true,
    hotOnly: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: require("html-webpack-template"),

      appMountId: "app",
      devServer: "http://localhost:3000",
      mobile: true,
      lang: "en-US",
      links: [
        "https://fonts.googleapis.com/icon?family=Material+Icons",
        {
          href: "/manifest.json",
          rel: "manifest"
        },
        {
          href: "/logo192.png",
          rel: "apple-touch-icon"
        },
        {
          href: "/favicon.ico",
          rel: "shortcut icon"
        }
      ],
      title: "Timeline"
    }),
    new ForkTsCheckerWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
};

export default config;