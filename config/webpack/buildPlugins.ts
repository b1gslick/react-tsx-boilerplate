import { Configuration, DefinePlugin } from "webpack";
import { BuildOptions } from "./types/types";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import ForkTsCheckerWebpackPligin from "fork-ts-checker-webpack-plugin"
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin"
import path from "path";

export function buildPlugins(options: BuildOptions): Configuration["plugins"] {
  const isProd = options.mode === 'production'

  const plugins: Configuration["plugins"] = [
    new HtmlWebpackPlugin({
      template: options.paths.html,
      favicon: path.resolve(options.paths.public, "favicon.ico")
    }),
    new DefinePlugin({
      __PLATFORM__: JSON.stringify(options.platform)
    }),
    new CleanWebpackPlugin(),
    new ForkTsCheckerWebpackPligin()
  ]

  if (isProd) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css',
      }),
    )
  }

  if (!isProd) {
    plugins.push((
      new ReactRefreshWebpackPlugin()
    ))
  }
  if (options.analyzer) {
    plugins.push(
      new BundleAnalyzerPlugin()
    )
  }

  return plugins;
}
