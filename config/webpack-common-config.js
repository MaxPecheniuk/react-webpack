// This file will contain configuration data that
// is shared between development and production builds.

const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const paths = require("./paths");

module.exports = {
	resolve: {
		// File extensions. Add others and needed (e.g. scss, json)
		extensions: [".js", ".jsx"],
		modules: ["node_modules"],
		// Aliases help with shortening relative paths
		// 'Components/button' === '../../../components/button'
		alias: {
			//
			// Components: path.resolve(paths.appSrc, "components"),
			// Containers: path.resolve(paths.appSrc, "containers"),
			// Utils: path.resolve(paths.appSrc, "utils")
		}
	},
	module: {
		rules: [
			{
				test: /\.(png|svg|jpg)$/,
				use: ["file-loader"]
			},
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
	},
	plugins: [
		new HtmlWebpackPlugin({
			inject: true,
			template: paths.appHtml
		})
	],
};