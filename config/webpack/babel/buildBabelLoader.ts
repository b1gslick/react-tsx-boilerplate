export function buildBabelLoader() {
  return {
    test: /\.ts(x?)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
    }
  }
}
