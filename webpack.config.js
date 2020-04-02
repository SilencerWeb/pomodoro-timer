const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// Contants
const BUILD_PATH = resolvePath('build');

// Helpers
function resolvePath(_path) {
  return path.resolve(__dirname, _path);
}

// Config
module.exports = function(webpackEnv) {
  const isProductionBuild = webpackEnv === 'production';
  const plugins = [];

  if (isProductionBuild) {
    plugins.push(new CleanWebpackPlugin());
  }

  return {
    entry: './src/index.tsx',
    output: {
      path: BUILD_PATH,
    },
    mode: isProductionBuild ? 'production' : 'development',
    devtool: isProductionBuild ? 'none' : 'source-map',
    stats: 'minimal',
    devServer: {
      index: 'index.html',
      contentBase: BUILD_PATH,
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
        },
      ],
    },
    plugins: plugins,
  };
};
