import path from 'path'
import type { Configuration } from 'webpack'
import { buildWebpack } from './config/webpack/buildWebpack'
import {
  BuildMode,
  BuildPaths,
  BuildPlatform,
} from './config/webpack/types/types'

interface EnvVariables {
  mode: BuildMode
  port: number
  analyzer?: boolean
  platform?: BuildPlatform
}

export default (env: EnvVariables) => {
  const paths: BuildPaths = {
    output: path.resolve(__dirname, 'build'),
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    src: path.resolve(__dirname, 'src'),
    public: path.resolve(__dirname, 'public'),
  }
  const config: Configuration = buildWebpack({
    port: env.port ?? 3000,
    mode: env.mode ?? 'development',
    paths: paths,
    analyzer: env.analyzer,
    platform: env.platform ?? 'desktop',
  })
  return config
}
