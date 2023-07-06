import path from "path";
import CopyWebpackPlugin from 'copy-webpack-plugin'
import { CleanWebpackPlugin } from "clean-webpack-plugin"
import nodeExternals from 'webpack-node-externals'
import WebpackShellPluginNext from "webpack-shell-plugin-next";
import TerserPlugin from "terser-webpack-plugin";
import Dotenv from 'dotenv-webpack'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'

const isProduction = process.env.NODE_ENV == "production";
const config: any = {  
  mode: "development",
  entry: {
    server: [
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
    new CopyWebpackPlugin({
      patterns: [
        // { from: 'src/views', to: 'views' },
        { from: 'public/images', to: 'public/images'},
        { from: 'public/fonts', to: 'public/fonts'},
        { from: 'public/uploads', to: 'public/uploads'},
        { from: 'public/templates', to: 'public/templates'}
      ],
    }),
    new Dotenv({
      path: './.env'
    }),
    new CssMinimizerPlugin({
      minify: CssMinimizerPlugin.cleanCssMinify
    }),
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
        'twig',
        /^locutus/,  
        /^fs/,
        /^path/,
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

if(isProduction){
  config.mode = "production"
}else{
  config.plugins.push(new WebpackShellPluginNext({
    onBuildEnd: {
    scripts: ['nodemon -e ts,css,twig,js ./build/server.bundle.js'],
    blocking: false,
    parallel: true
  }}))
}

export default config