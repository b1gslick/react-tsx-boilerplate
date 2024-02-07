import path from 'path'
import miniCssExtractPlugin from 'mini-css-extract-plugin'
import HTMLWebpackPlugin from 'html-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server'
import type { Configuration } from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

type Mode = 'production' | 'development'
const devServer: DevServerConfiguration = {
  port: 3000,
  static: {
    directory: path.join(__dirname, 'build/'),
  },
  historyApiFallback: true,
}

interface EnvVariables {
  mode: Mode
  port: number
}

export default (env: EnvVariables) => {
  const isDev = env.mode === 'development' ? true : false
  const config: Configuration = {
    mode: env.mode,
    entry: path.resolve(__dirname, 'src', 'index.tsx'),

    output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].[contenthash].js',
      clean: true,
    },

    resolve: {
      modules: ['node_modules'],
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: ['.js', '.ts', '.tsx', '.jsx', '.css', '.scss'],
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: isDev ? 'inline-source-map' : false,

    devServer,

    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          use: 'ts-loader',
        },
        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'source-map-loader',
        },
        // The following loader rules are necessary for s/css modules
        {
          test: /\.(png|jpe?g|gif|svg)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                fallback: 'file-loader',
              },
            },
          ],
        },
      ],
    },

    plugins: [
      !isDev &&
        new miniCssExtractPlugin({
          // both options are optional
          filename: 'css/[name].[contenthash:8].css',
          chunkFilename: 'css/[name].[contenthash:8].css',
        }),
      new HTMLWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html'),
      }),
      new CleanWebpackPlugin(),
    ],
  }

  return config
}
