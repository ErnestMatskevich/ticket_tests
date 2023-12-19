const pkg = require("./package");
// const webpack = require("webpack");
module.exports = {
  apiPath: "stubs/api",
  webpackConfig: {
    output: {
      publicPath: `/static/${pkg.name}/${process.env.VERSION || pkg.version}/`,
    },
    // plugins: [
    //   new webpack.DefinePlugin({
    //     process: {
    //       env: {},
    //     },
    //   }),
    // ],
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
      ],
    },
  },
  navigations: {
    "tickettrack.main": "/tickettrack",
  },
  features: {
    tickettrack: {
      // add your features here in the format [featureName]: { value: string }
    },
  },
  config: {
    key: "value",
  },
};
