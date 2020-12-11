const path = require("path");
const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const WebpackPwaManifest = require("webpack-pwa-manifest");

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
      }),
      // Run Webpack to Create Manifest
      new WebpackPwaManifest({
        name: "Food Event",
        short_name: "Foodies",
        description: "An app that allows you to view upcoming food events.",
        // Specify the homepage for the PWA relative to the location of the manifest file
        start_url: "../index.html",
        background_color: "#01579b",
        theme_color: "#ffffff",
        // Specify that we do not want webpack to generate unique fingerprints each time a new manifest is created
        fingerprints: false,
        // Determines whether the link to the manifest is added to the HTML (we will hard code instead)
        inject: false,
        // App icon properties
        icons: [{
          src: path.resolve("assets/img/icons/icon-512x512.png"),
          sizes: [96, 128, 192, 256, 384, 512],
          // Designate where the icons will be sent after the creation of the web manifest
          destination: path.join("assets", "icons")
        }]
      })
    ],
    // The mode in which we want webpack to run (default: production mode)
    mode: 'development'
};

module.exports = config;

