import merge from 'webpack-merge';

import common from './webpack.common.js';

export default merge(common, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: '[name].[contenthash].js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
});
