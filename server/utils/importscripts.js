import fs from 'fs'
import path from 'path'
import fountain from 'fountain-js'
import ParseMarkdownMetadata from 'parse-markdown-metadata'

import mongoose from 'mongoose'

import Post from '../models/post.model'
import readFiles from './readfiles'


/* Connect to db.*/
mongoose.Promise = global.Promise
var MONGO_DB_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/screenplays'
mongoose.connect(MONGO_DB_URL, (error) => {
    if (error) { throw error }
    console.log("Connected to the db at " + MONGO_DB_URL + "!")
})


/* Save a post */
function createPost(post) {
    console.log("Creating post " + post.slug)

    post = new Post(post)

    post.save((err, post) => {
	console.log("Post created " + JSON.stringify(post.slug))
    })
}

/* Remove all posts */
/* 
Post.find().remove((post)=>{
    console.log(JSON.stringify(post) + " deleted")
})
*/

/* Read all files from content directory */    
readFiles(path.resolve(__dirname, '../content')).then(files => {
    console.log( "Loading files ", files.length );

    files.forEach( (item, index) => {
	/* Parse each file, add it to the db */
	var md = new ParseMarkdownMetadata(item.contents)
	var meta = md.props
	var post = {
	    title: meta.title,
	    image: meta.image,			
	    slug: meta.slug,
	    author: meta.author,	    
	    series: meta.series,
	    imdb: meta.imdb,
	    pdf: meta.pdf,
	    image: meta.image,
	    body: md.content
	}
	createPost(post)
    });
})



