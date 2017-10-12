var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

module.exports = {
    entry: path.resolve(__dirname, 'server.js'),
    target: 'node',
    output: {
	path: __dirname + '/dist/',
	filename: 'server.bundle.js',
	libraryTarget: 'commonjs2'	
    },
    module: {
	loaders: [{
	    test: /\.js$/,
	    exclude: /node_modules/,
	    loader: 'babel-loader',
	    query: {
		presets: ['es2015']
	    }
	}, {
	    test: /\.json$/,
	    exclude: /node_modules/,
	    loader: 'json-loader!json-loader'
	}]
    }
}
