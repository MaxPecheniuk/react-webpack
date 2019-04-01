
// configuration data related to development only

const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");

const paths = require("./paths");
// import common webpack config
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
	module: {
		rules: [
			{
				// look for .js or .jsx files
				test: /\.(js|jsx)$/,
				// in the `src` directory
				include: path.resolve(paths.appSrc),
				exclude: /(node_modules)/,
				use: {
					// use babel for transpiling JavaScript files
					loader: "babel-loader",
					options: {
						presets: ["@babel/react"]
					}
				}
			},
			{
				// look for .css or .scss files
				test: /\.(css|scss)$/,
				// in the `src` directory
				include: [path.resolve(paths.appSrc)],
				use: [
					{
						loader: "style-loader"
					},
					{
						loader: "css-loader",
						options: {
							// discardDuplicates: true,
							importLoaders: 1,
							// This enables local scoped CSS based in CSS Modules spec
							modules: true,
							// generates a unique name for each class (e.g. app__app___2x3cr)
							//TODO: modules
							localIdentName: "[name]__[local]___[hash:base64:5]"
						}
					}
					// Add additional loaders here. (e.g. sass-loader)
				]
			}
		]
	}
});