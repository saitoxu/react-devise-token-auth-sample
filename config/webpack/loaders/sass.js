const ExtractTextPlugin = require('extract-text-webpack-plugin')
const { env } = require('../configuration.js')

module.exports = {
  test: /\.(scss|sass|css)$/i,
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      {
        loader: 'css-loader',
        // options: { minimize: env.NODE_ENV === 'production' },
        options: {
          minimize: env.NODE_ENV === 'production',
          modules: true,
          importLoaders: 1,
          localIdentName: "[path]__[name]__[local]__[hash:base64:5]"
        }
      },
      { loader: 'postcss-loader', options: { sourceMap: true } },
      'resolve-url-loader',
      { loader: 'sass-loader', options: { sourceMap: true } }
    ]
  })
}
