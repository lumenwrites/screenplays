const path = require('path')

module.exports = {
    /* Inform webpack that we're building a bundle for node.js, not browser. */
    target: 'node',
    /* Tell webpack the root file of our app */
    entry: './server.js',
    /* Tell webpack to put output file into ./build/server.js. */
    output: {
	filename: 'server.js',
	path: path.resolve(__dirname, 'build')
    },

    /* Run babel on all files it runs through,
       converting ES6 and JSX code into regular ES5. */
    module: {
	rules: [
	    {
		test: /\.js?$/,
		loader: 'babel-loader',
		exclude: /node_modules/,
		options: {
		    presets: [
			'latest'
		    ]
		}
	    },
	    {
		test: /\.fountain/,
		use: 'raw-loader'
	    }	    
	]
    }
}

/*
,
      {
	  test: /\.json$/,
	  exclude: /node_modules/,
	  loader: 'json-loader!json-loader'
      }
*/
