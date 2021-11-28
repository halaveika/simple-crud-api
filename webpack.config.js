const path = require('path');

module.exports = {
  context: __dirname,
  entry: ['./src/server.js'],
  target:'node',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist'),
    clean: true,
   publicPath: '/',
  },
}