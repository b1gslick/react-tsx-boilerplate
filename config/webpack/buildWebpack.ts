import type { Configuration } from 'webpack'
import { buildDevServer } from './buildDevServer'
import { buildLoaders } from './buildLoaders'
import { buildPlugins } from './buildPlugins'
import { buildResolver } from './buildResolvers'
import { BuildOptions } from './types/types'

export function buildWebpack(options: BuildOptions): Configuration {

  const isDev = options.mode === 'development';

  const config: Configuration = {
    mode: options.mode ?? 'development',
    entry: options.paths.entry,

    output: {
      path: options.paths.output,
      filename: '[name].[contenthash].js',
      clean: true,
    },

    resolve: buildResolver(options),

    module: {
      rules: buildLoaders(options)
    },

    plugins: buildPlugins(options),

    devtool: isDev ? 'inline-source-map' : false,

    devServer: isDev ? buildDevServer(options) : undefined
  }

  return config

}
