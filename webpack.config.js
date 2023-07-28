
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx','.d.ts'],
    plugins: [new TsconfigPathsPlugin()],
  },
};
