const { config } = require("webpack");
const webpack = require("webpack");

module.exports = {
  configureWebpack: {
    plugins: [new webpack.IgnorePlugin(/osx-temperature-sensor/)],
    externals: {
      ffi: "require('ffi')",
    },
    // Webpack configuration applied to web builds and the electron renderer process
  },
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      chainWebpackMainProcess: function (config) {
        config.module
          .rule("node")
          .test(/\.node$/)
          .use("node-loader")
          .loader("node-loader")
          .end();

        return config;
      },
    },
    externals: ["ffi"],
  },
};
