import path from 'path'

import express from 'express'
import mongoose from 'mongoose'

/* Import routes */
import postsRoutes from './routes/posts.routes'


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



/* Setup app */
const server = express()

server.set('view engine', 'ejs')
server.set('views', path.resolve(__dirname, './views'))

/* Serve static files */
server.use('/styles', express.static(path.resolve(__dirname, '../client/styles')))
server.use('/img', express.static(path.resolve(__dirname, '../client/img')))
server.use('/js', express.static(path.resolve(__dirname, '../client/')))
server.use('/scripts', express.static(path.resolve(__dirname, './content')))

/* Connect routes */
server.use('/', postsRoutes)

// Routes
server.get('/', function (req, res) {
    console.log('test')
    return res.send('test')
})

const port = process.env.PORT || 3000
server.listen(port, function () {
    console.log('Running on port 3000!')
})
