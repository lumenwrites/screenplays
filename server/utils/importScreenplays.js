import fs from 'fs'
import path from 'path'
import fountain from 'fountain-js'
import ParseMarkdownMetadata from 'parse-markdown-metadata'
import slug from 'slug'

import mongoose from 'mongoose'

import Post from '../models/post.model'
import readFiles from './readfiles'


/* Connect to db.*/
mongoose.Promise = global.Promise
var MONGO_DB_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/screenplays'
mongoose.connect(MONGO_DB_URL, (error) => {
    if (error) { throw error }
    console.log("Connected to the db at " + MONGO_DB_URL)
    console.log("Dropping db before import")
    mongoose.connection.db.dropDatabase()
})

/* Read all files from content directory */    
readFiles(path.resolve(__dirname, '../content')).then(files => {
    console.log( "Loading files ", files.length );
    /* files = files.slice(0,5) */
    files.forEach( (item, index) => {
	/* For all fountain files */
	if (item.filename.includes('.fountain')) {
	    const fountainPost = item.contents
	    const md = new ParseMarkdownMetadata(fountainPost)
	    /* Meta data at the beginning of the file */
	    const meta = md.props

	    fountain.parse(fountainPost, (output)=>{
		var post = new Post({
		    /* Title */
		    title: meta.title,
		    slug: item.filename.substring(0, item.filename.lastIndexOf('.')),
		    /* Author */
		    author: meta.author.split(",")[0],
		    authorSlug: slug(meta.author.split(",")[0] || "").toLowerCase(),
		    /* Series (for tv shows or sequels) */
		    series: meta.series,
		    seriesSlug: slug(meta.series || "").toLowerCase(),
		    /* Content */
		    titlePage: output.title_page_html, // first page of the screnplay
		    body: output.script_html,
		    /* Meta */
		    image: meta.image,
		    imdb: meta.imdb,
		    pdf: meta.pdf,
		})
		post.save((err,post)=>{
		    if (err) { console.log(err) }
		    console.log("Imported script", post.title)
		})
	    })
	}
    })
})



