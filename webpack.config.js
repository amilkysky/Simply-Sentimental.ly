// const path = require('path')

// const config = {
//   entry: path.join(__dirname, './client/src/app'),
//   output: {
//     filename: 'bundle.js',
//     path: path.resolve(__dirname, 'public/dist')
//   },
//   devtool: 'source-map',
//   module: {
//     rules: [
//       {
//         test: /\.(js|jsx)$/,
//         include: path.join(__dirname, 'client/src'),
//         exclude: /node_modules/,
//         loader: 'babel-loader',
//         query: {
//           presets: ['react', 'es2015', 'stage-3']
//         }
//       }
//     ]
//   }
// }

// module.exports = {
//   config
// }


const path = require('path');

module.exports = {
    entry: ["babel-polyfill", path.join(__dirname, './client/src/app')],
    output: {
  filename: "bundle.js",
  path: path.resolve(__dirname, 'public/dist')
    },
    devtool: "source-map",
    module: { 
  rules: [
      {
    test: /\.(js|jsx)$/,
    include: path.join(__dirname, 'client/src'),
    exclude: /node_modules/, 
    loader: 'babel-loader', 
    query: {
        presets: ['react', 'es2015', 'stage-3'] 
    }
      }
  ]
    }
};