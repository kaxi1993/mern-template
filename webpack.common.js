import path from 'path';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  entry: {
    app: ['./client/index.tsx', 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&overlay=false&reload=true']
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(new URL('dist', import.meta.url).pathname),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    modules: ['node_modules']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Mern',
      template: path.resolve(new URL('client/index.html', import.meta.url).pathname),
      filename: 'index.html'
    })
  ]
};
