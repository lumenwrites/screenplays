import express from 'express'
import path from 'path'

import fountain from 'fountain-js'


/* Import routes */
import postsRoutes from './routes/posts.routes';

/* Setup app */
const app = express()
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views');

/* Serve static files */
app.use('/static', express.static(path.resolve(__dirname, './static')))

/* Connect routes */
app.use('/', postsRoutes);

// Routes
app.get('/', function (req, res) {

})

const port = process.env.PORT || 3000
app.listen(port, function () {
    console.log('Running on port 3000!')
})
