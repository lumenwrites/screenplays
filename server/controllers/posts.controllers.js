import fs from 'fs'
import path from 'path'
import slug from 'slug';

import fountain from 'fountain-js'
import ParseMarkdownMetadata from 'parse-markdown-metadata'


import readFiles from '../utils/readfiles'

/* Magic that's reading fountain files as strings */
require.extensions['.fountain'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};


/* Import config */
const config = require('../config/config.json');

/* Home */
export function home(req, res) {
    res.render('index', {html: 'Hello', config: config})
}

/* Get all posts */
export function getPosts(req, res) {
    /* Read all files from content directory */    
    readFiles(path.resolve(__dirname, '../content'))
	.then(files => {
	    console.log( "loaded ", files.length );

	    var allPosts = []
	    files.forEach( (item, index) => {
		if (item.filename.includes('.fountain')) {
		    /* Parse each file, add it to all posts */
		    var md = new ParseMarkdownMetadata(item.contents)
		    var meta = md.props
		    if (meta.series) {
			var seriesslug = slug(meta.series).toLowerCase()
		    }
		    if (meta.author) {
			var authorslug = slug(meta.author).toLowerCase()
		    }
		    
		    var post = {
			title: meta.title,
			image: meta.image,
			imdb: meta.imdb,
			pdf: meta.pdf,
			author: meta.author,   		    
			authorslug: authorslug,
			series: meta.series,
			seriesslug:seriesslug,
			slug: item.filename.substring(0, item.filename.lastIndexOf('.'))
		    }


		    var author = req.params.author
		    var series = req.params.series		
		    var query = req.query.query
		    if (query) {
			/* Search */
			/* If there's query, only add the posts that have it in meta. */
			query = query.toLowerCase()
			var searchIn = meta.title + meta.author + meta.series
			searchIn = searchIn.toLowerCase()
			if (searchIn.includes(query)) {
			    allPosts.push(post)
			}
		    } else if (author) {
			/* Author's posts */
			/* take author's slug and hackily search for it */
			author = author.replace(/-/g," ")
			var searchIn = meta.author.toLowerCase()
			if (searchIn.includes(author)) {
			    allPosts.push(post)
			}
		    } else if (series) {
			/* By series */
			series = series.replace(/-/g," ")
			if (meta.series) {
			    var searchIn = meta.series.toLowerCase()
			    console.log(series)
			    if (searchIn.includes(series)) {
				allPosts.push(post)
			    }
			}
		    } else {
			allPosts.push(post)
		    }
		} /* End if .fountain */
	    });

	    /* Return list of posts (later I'll render it into a template here. */
	    /* res.json(allPosts) */
	    res.render('index', {posts: allPosts, config })
	})
	.catch( error => {
	    console.log( error );
	});
    

}

/* Get a single post */
export function getPost(req, res) {
    console.log("Fetching post by slug " + req.params.slug)
    const fountainPost = require('../content/'+req.params.slug+'.fountain')

    var md = new ParseMarkdownMetadata(fountainPost)
    var meta = md.props
    
    fountain.parse(fountainPost, (output)=>{
	if (meta.series) {
	    var seriesslug = slug(meta.series).toLowerCase()
	}
	var post = {
	    title: meta.title,
	    image: meta.image,			
	    slug: req.params.slug,
	    imdb: meta.imdb,
	    pdf: meta.pdf,
	    author: meta.author,
	    authorslug: slug(meta.author).toLowerCase(),	    
	    series: meta.series,
	    seriesslug:seriesslug,
	    titlePage: output.title_page_html,
	    html: output.script_html
	}
	
	res.render('post', {post, config })
    })

}


