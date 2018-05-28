const path = require('path')
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals')


module.exports = {
    /* Tell webpack the root file of our app */
    /* 'babel-polyfill' should be first entry to make async/await work */
    entry: ['babel-polyfill', './server.js'],

    /* Tell webpack to put output file into ./build/server.js. */
    output: {
	path: __dirname + '/dist/',	
	filename: 'server.build.js'
    },

    /* Exclude default node packages */
    target: 'node',
    /* Exclude node_modules from bundling in webpack */
    externals: [nodeExternals()], 
    
    /* Fixes relative paths */
    node: {
	__filename: true,
	__dirname: true,
    },

    module: {
	rules: [
	    {
		test: /\.js$/,
		exclude: /node_modules/,
		use: {
		    loader: "babel-loader",
		    options: {
			presets: ['env','stage-2']
		    }
		}
	    },
	    {
		test: /\.fountain/,
		use: 'raw-loader'
	    }	    
	]
    }    
}
