const path = require("path");
const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

// Create the main configuration object within our file
// The options within this object tell webpack what to do
const config = {
    // Entry Points
    entry: {
      app: "./assets/js/script.js",
      events: "./assets/js/events.js",
      schedule: "./assets/js/schedule.js",
      tickets: "./assets/js/tickets.js"
    },
    // Output the bundled code into a folder that we specify
    output: {
      filename: "[name].bundle.js",
      path: __dirname + "/dist",
    },
    // Add modules
    module: {
      rules: [
        // Run file-loader for images
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name(file) {
                  return '[path][name].[ext]';
                },
                publicPath: function(url) {
                  return url.replace('../', '/assets/');
                }
              }
            },
            {
              loader: 'image-webpack-loader'
            }
          ]
        }
      ]
    },
    // Add plugins
    plugins: [
      // run jQuery
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
      }),
      // Run BundleAnalyzer
      new BundleAnalyzerPlugin({
        analyzerMode: "static", // the report outputs to an HTML file in the dist folder
      })
    ],
    // The mode in which we want webpack to run (default: production mode)
    mode: 'development'
};

module.exports = config;

