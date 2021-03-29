const { config } = require("webpack");
const webpack = require("webpack");

module.exports = {
  configureWebpack: {
    plugins: [new webpack.IgnorePlugin(/osx-temperature-sensor/)],
    externals: {
      ffi: "require('ffi')",
      vertx: "commonjs vertx",
    },
    // Webpack configuration applied to web builds and the electron renderer process
  },
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      chainWebpackMainProcess: function(config) {
        config.module
          .rule("node")
          .test(/\.node$/)
          .use("node-loader")
          .loader("node-loader")
          .end();

        return config;
      },
      builderOptions: {
        appId: "ZGV4dGVyNGxpZmVAZ21haWwuY29t",
        productName: "Profiler",
        copyright: "Anpela",
        win: { icon: "./src/assets/logo.ico" },
        publish: [{ provider: "generic", url: "https://peter.anpela.com" }],
        asar: true,
        asarUnpack: ["dist_electron"],
        extraFiles: {
          from: "./node_modules/iohook/builds/electron-v85-win32-x64/build/Release/iohook.node",
          to: "./dist_electron"
        },
      },
    },
    externals: ["ffi"],
  },
};
