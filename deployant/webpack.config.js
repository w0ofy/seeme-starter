// const webpack = require('webpack');
// const path = require('path');


// const config = {
//   context: __dirname,
//   entry: './src/index.js',
//   output: {
//     path: __dirname,
//     publicPath: '/public',
//     filename: 'bundle.js',
//   },
//   module: {
//     rules: [
//       { test: /\.css$/, use: 'css-loader' },
//     ],
//     loaders: [
//       {
//         exclude: /node_modules/,
//         test: /\.(js|jsx)$/,
//         loader: 'babel',
//       },
//     ]
//   },
//   devServer: {
//     historyApiFallback: true,
//     contentBase: './',
//   },
//   plugins: [
//     new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }),
//     new webpack.optimize.DedupePlugin(),
//     new webpack.optimize.OccurenceOrderPlugin(),
//     new webpack.optimize.UglifyJsPlugin({
//       compress: { warnings: false },
//       output: { comments: false },
//       mangle: false,
//       sourcemap: false,
//       minimize: false,
//       mangle: { except: ['$super', '$', 'exports', 'require', '$q', '$ocLazyLoad'] },
//     })
//   ]
// };

// module.exports = config;
