import path from "path";
import CopyWebpackPlugin from 'copy-webpack-plugin'
import { CleanWebpackPlugin } from "clean-webpack-plugin"
import nodeExternals from 'webpack-node-externals'
import WebpackShellPluginNext from "webpack-shell-plugin-next";
import TerserPlugin from "terser-webpack-plugin";
import Dotenv from 'dotenv-webpack'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'

// import webpack from 'webpack'
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const CopyWebpackPlugin = require('copy-webpack-plugin');
// const { CleanWebpackPlugin }  = require('clean-webpack-plugin')
// const nodeExternals = require('webpack-node-externals');
// const webpack  = require("webpack");
// const WebpackShellPluginNext = require('webpack-shell-plugin-next');
// const NodemonPlugin = require('nodemon-webpack-plugin')
// const Dotenv = require('dotenv')

const isProduction = process.env.NODE_ENV == "production";
// "css-loader", "postcss-loader"
const config: any = {  
  mode: "development",
  // entry: {
  //   main: "./src/index.ts",
  // },
  // entry: './src/index.ts',
  // entry: {
  //   app: './src/index.ts',
  //   hot: 'webpack/hot/dev-server.js',
  //   client: 'webpack-dev-server/client/index.js?hot=true&live-reload=true'
  // },
  entry: {
    server: [
      // 'webpack-hot-middleware/client?path=/__webpack_hmr&reload=true&timeout=20000&overlay=false&noInfo=true',
      './src/index.ts',
    ],
    'public/js/client': ['./src/client/index.ts']
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "build"),
    clean: true,
    libraryTarget: 'var',
    assetModuleFilename: 'images/[hash][ext][query]',
    library: {
      name: "app",
      type: "commonjs2",
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    // new HtmlWebpackPlugin({
    //   template: "build/index.html",
    // }),
    // new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        // { from: 'src/views', to: 'views' },
        { from: 'public/images', to: 'public/images'},
        { from: 'public/fonts', to: 'public/fonts'},
        { from: 'public/uploads', to: 'public/uploads'}
      ],
    }),
    new Dotenv({
      path: './.env'
    }),
    new CssMinimizerPlugin({
      minify: CssMinimizerPlugin.cleanCssMinify
    }),
    // new NodemonPlugin({
    //   script: './build/app.bundle.js',
    // })    
  ],
  module: {
    rules: [
      {
        test: /\.ts$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
        options: {
          transpileOnly: true
        }
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset/inline",
        // generator: {
        //   filename: "public/fonts/[name][ext][query]"
        // }
      },
      {
        test: /\.css$/i,
        include: path.join(path.resolve(__dirname,"public"),"css"),
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              url: false
            }
          },
          "postcss-loader"
        ],        
      },
      {
        test: /\.twig$/,
        use: 'twigjs-loader',
      }
      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      '@views': path.resolve(__dirname,'src/views/base/'),
      '@': path.resolve(__dirname,"src"),
      'public': path.resolve(__dirname,"public")
    }
  },  
  target: 'node',
  externalsPresets: { node: true },
  node: {
    global: true
  },
  devtool: 'source-map',
  // devtool: 'inline-source-map',
  externals: [
    nodeExternals({
      allowlist: [
        'webpack-hot-middleware/client?path=/__webpack_hmr&reload=true&timeout=20000&overlay=false&noInfo=true',
        'webpack-dev-server',        
        /^tailwindcss/,   
        /^lodash/
      ]
    }),
  ],
  watchOptions: {
    ignored: /node_modules/,
  },
  stats: {
    warningsFilter: /export .* was not found in/
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'build'),
    },
    compress: true,
    port: 3000,
    hot: true,
    watchFiles: [
      './src/**/*.ejs',
      './src/**/*.js',
      './src/**/*.ts',
      './src/**/*.twig'
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
      extractComments: false
    }),
    new CssMinimizerPlugin({
      minimizerOptions: {
        preset: [
          "default",
          {
            discardComments: { removeAll: true },
          },
        ],
      }
    })
  ],
  }
};
// nodemon -e ts,js,twig ./build/app.bundle.js
// module.exports = () => {
//   if (isProduction) {
//     config.mode = "production";
//   } else {
//     config.mode = "development";
//     config.plugins.push(new WebpackShellPluginNext({
//       // onBuildStart: {
//       //   scripts: ['npm run build-css'],
//       //   blockin: true,
//       //   parallel: false
//       // },
//       onBuildEnd: {
//       scripts: ['nodemon -e ts,css,twig,js ./build/server.bundle.js'],
//       blocking: false,
//       parallel: true
//     }}))
//     // config.plugins.push(new WebpackShellPlugin({
//     //   onBuildEnd: ['nodemon ./build/app.bundle.js']
//     // }))    
//   }
//   return config;
// };

if(isProduction){
  config.mode = "production"
}else{
  config.mode = "development"
      config.plugins.push(new WebpackShellPluginNext({
      onBuildEnd: {
      scripts: ['nodemon -e ts,css,twig,js ./build/server.bundle.js'],
      blocking: false,
      parallel: true
    }}))
}

export default config