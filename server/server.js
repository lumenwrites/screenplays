import express from 'express'
import bodyParser from 'body-parser' // Parse requests, turn them into json
import morgan from 'morgan' // A logging framework, terminal output for debugging.
import mongoose from 'mongoose' // ORM between mongo and node.
import cors from 'cors' // Cors allows requests from different domains
import path from 'path' // Manipulate filepaths

/* Import routes */
import postsRoutes from './routes/posts.routes'


// Connect to db.
mongoose.Promise = global.Promise
var MONGO_DB_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/screenplays'
mongoose.connect(MONGO_DB_URL, (error) => {
    if (error) { console.error("Can't connect to mongo."); throw error }
    console.log("Connected to the db at " + MONGO_DB_URL)
})



/* Setup app */
const server = express()

server.set('view engine', 'ejs')
server.set('views', path.resolve(__dirname, './views'))

/* Serve static files */
server.use('/js', express.static(path.resolve(__dirname, '../client/dist')))
server.use('/img', express.static(path.resolve(__dirname, '../client/img')))
server.use('/styles', express.static(path.resolve(__dirname, '../client/styles')))
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
