/* Entry Script */
if (process.env.NODE_ENV === 'production') {
    /* In production, serve the webpacked server file. */
    console.log('Production mode, running ./dist/server.build.js')
    require('./dist/server.build.js')
} else {
    /* Babel polyfill to convert ES6 code in runtime */
    require('babel-register')({
	"presets": ["env", "stage-2"],
    })
    
    require('babel-core/register')
    require('babel-polyfill') // For async/await
    require('./server.js')
}
