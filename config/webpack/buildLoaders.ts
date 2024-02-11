import { ModuleOptions } from "webpack";
import { BuildOptions } from "./types/types";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { buildBabelLoader } from "./babel/buildBabelLoader";
// import ReactRefreshTypeScript from "react-refresh-typescript";

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {

  const isDev = options.mode === "development";

  const cssLoaderWithModules = {
    loader: "css-loader",
    options: {
      modules: {
        localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]'
      }
    }
  }

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      cssLoaderWithModules,
      'sass-loader',
    ],
  }

  // const tsLoader = {
  //   test: /\.ts(x?)$/,
  //   exclude: /node_modules/,
  //   use: [
  //     {
  //       loader: 'ts-loader',
  //       options: {
  //         transpileOnly: true,
  //         getCustomTransformers: () => ({
  //           before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
  //         }),
  //       }
  //     }
  //   ]
  // }
  //
  const assetLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
  }

  const svgrLoader = {
    test: /\.svg$/i,
    use: [{
      loader: '@svgr/webpack', options: {
        icon: true,
        svgoConfig: {
          plugins: [
            {
              name: 'convertColors',
              params: {
                currentColor: true,
              }
            }
          ]
        }

      }
    }],
  }

  const babelLoader = buildBabelLoader()


  return [
    assetLoader,
    scssLoader,
    // tsLoader,
    babelLoader,
    {
      enforce: 'pre',
      test: /\.js$/,
      loader: 'source-map-loader',
    },
    svgrLoader
  ]
}


