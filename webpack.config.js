const path = require("path");
const webpack = require("webpack");

// Create the main configuration object within our file
// The options within this object tell webpack what to do
module.exports = {
    // Entry Point
    entry: './assets/js/script.js',
    // Output the bundled code into a folder that we specify
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.bundle.js'
      },
    // Add plugins
    plugins: [
      // run jQuery
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
      }),
    ],
    // The mode in which we want webpack to run (default: production mode)
    mode: 'development'
};

