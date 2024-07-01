const webpack = require("webpack");

module.exports = {
  resolve: {
    alias: {
      buffer: "buffer",
    },
    fallback: {
      path: false,
      os: false,
      crypto: false,
      buffer: require.resolve("buffer/"),
    },
    plugins: [
      new webpack.ProvidePlugin({
        Buffer: ["buffer", "Buffer"],
      }),
    ],
  },
};
