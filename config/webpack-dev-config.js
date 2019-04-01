
// configuration data related to development only

const webpack = require("webpack");
const merge = require("webpack-merge");
const paths = require("./paths");
const common = require("./webpack-common-config.js");

module.exports = merge(common, {
	entry: [paths.appIndexJs],
	mode: "development",
	// TODO: read devtools
	// devtool option controls if and how source maps are generated.
	// see https://webpack.js.org/configuration/devtool/
	// If you find that you need more control of source map generation,
	// see https://webpack.js.org/plugins/source-map-dev-tool-plugin/
	devtool: "eval",
	plugins: [
		// will use the path to the module rather than a numerical identifier.
		// While this plugin is useful during development for more readable output, it does take a bit longer to run.
		new webpack.NamedModulesPlugin(),
		// allows you to create global constants which can be configured at compile time.
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("development")
			}
		})
	],
});