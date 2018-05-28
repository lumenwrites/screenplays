const path = require('path')
const webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');

const isProd = process.env.NODE_ENV === "production"

function getPlugins() {
    const plugins = []
    if (isProd) {
	/* Makes React tools development warning go away */
        plugins.push(new webpack.DefinePlugin({
	    'process.env': {
		NODE_ENV: JSON.stringify('production')
	    }
	}))
    }
    /* Add jquery */
    plugins.push(
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    )
    return plugins
}

module.exports = {
    /* Tell webpack the root file of our app */
    entry: './index.js',

    /* Tell webpack to put output file into ./build/server.js. */
    output: {
	path: path.resolve(__dirname, 'dist'),
	filename: 'client.js'
    },
    module: {
	rules: [
	    {
		test: /\.js$/,
		exclude: /node_modules/,
		use: {
		    loader: "babel-loader",
		    options: {
			/* env is the latest js, stage-2 fixes spread({...}) */
			presets: ['env', 'stage-2'],
		    },
		}
	    }
	]
    },
    plugins: getPlugins()
}
