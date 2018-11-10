'use strict'

const webpack = require('webpack')
const path    = require('path')

module.exports = {
  devtool: 'source-map',

  entry: `${__dirname}/src/bootstrap.ts`,

  output: {
    path: `${__dirname}/dist/`,
    filename: 'bundle.js',
    sourceMapFilename: 'bundle.map.js',
    devtoolModuleFilenameTemplate: function(info) {
      return 'file:///' + info.absoluteResourcePath
    }
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.ts?$/,
        exclude: ['node_modules'],
        use: ['awesome-typescript-loader', 'source-map-loader']
      },
      {
        test: [ /\.vert$/, /\.frag$/ ],
        use: 'raw-loader'
      }
    ]
  },

  resolve: {
    extensions: ['.ts', '.js']
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        tslint: {
          emitErrors: true,
          failOnHint: true
        }
      }
    }),
    new webpack.DefinePlugin({
      'CANVAS_RENDERER': JSON.stringify(true),
      'WEBGL_RENDERER': JSON.stringify(true)
    })
  ],

  devServer: {
    contentBase: path.join(__dirname, 'dist/')
  }
}