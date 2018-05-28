import fs from 'fs'
import path from 'path'
import slug from 'slug';

/* Import config (site meta data) */
import config from '../config/config'

/* Models */
import Post from '../models/post.model'

/* Home */
export function home(req, res) {
    res.render('index', {posts: [], config: config})
}

/* Get all posts */
export function getPosts(req, res) {
    console.log('get posts')
    const { authorSlug, seriesSlug } = req.params
    const searchQuery = req.query.query // ?query=something
    var filter = {}
    if(searchQuery) {
	filter = {$text : { $search: searchQuery }}
    }
    if(authorSlug){
	filter.authorSlug = authorSlug
    }
    if(seriesSlug){
	filter.seriesSlug = seriesSlug
    }

    Post.find(filter)
	.skip(0) // for pages
//	.limit(10)
	.sort('-series -author title').then((posts)=>{
	    console.log(posts[0].title)
	    return res.render('index', {posts, config, query: searchQuery })
	}).catch((err)=> console.log(err))
}

export function getPost(req, res) {
    const { slug } = req.params
    Post.findOne({slug:slug}).then((post)=>{
	/* console.log("Return post",post.title) */
	return res.render('post', {post, config, query:"" })
    }).catch((err)=> console.log(err))
}
