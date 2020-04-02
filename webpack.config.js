const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

// Contants
const BUILD_PATH = resolvePath('build');
const PUBLIC_PATH = resolvePath('public');

// Helpers
function resolvePath(_path) {
  return path.resolve(__dirname, _path);
}

// Config
module.exports = function(webpackEnv) {
  const isProductionBuild = webpackEnv === 'production';

  const copyPlugin = new CopyPlugin([{ from: PUBLIC_PATH, to: BUILD_PATH }]);
  const cleanPlugin = new CleanWebpackPlugin();

  const plugins = [copyPlugin];
  if (isProductionBuild) {
    plugins.push(cleanPlugin);
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
