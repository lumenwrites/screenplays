import path from 'path'
import fountain from 'fountain-js'

import express from 'express'
import mongoose from 'mongoose'


// Connect to db.
mongoose.Promise = global.Promise
var MONGO_DB_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/screenplays'
mongoose.connect(MONGO_DB_URL, (error) => {
    if (error) {
	console.error('Please make sure Mongodb is installed and running!') 
	throw error
    } else {
	console.log("Connected to the db at " + MONGO_DB_URL)
    }
})


/* Import routes */
import postsRoutes from './routes/posts.routes'

/* Setup app */
const app = express()
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

/* Serve static files */
app.use('/static', express.static(path.resolve(__dirname, './static')))
app.use('/scripts', express.static(path.resolve(__dirname, './content')))

/* Connect routes */
app.use('/', postsRoutes)

// Routes
app.get('/', function (req, res) {

})

const port = process.env.PORT || 3000
app.listen(port, function () {
    console.log('Running on port 3000!')
})
