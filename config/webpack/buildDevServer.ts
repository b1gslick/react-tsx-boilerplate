import type { Configuration as DevServerConfiguration } from 'webpack-dev-server'
import { BuildOptions } from './types/types'

export function buildDevServer(options: BuildOptions): DevServerConfiguration {

  const devServer: DevServerConfiguration = {
    port: options.port,
    open: true,
    static: {
      directory: options.paths.output,
    },
    historyApiFallback: true,
    hot: true
  }

  return devServer
}
