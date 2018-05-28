import { Router } from 'express'
const router = new Router()

/* Import controllers */
import * as postsControllers from '../controllers/posts.controllers'

/* Home */
/* router.route('/').get(postsControllers.home); */

/* Get all Posts*/
router.route('/').get(postsControllers.getPosts)
/* Filter posts by author/series */
router.route('/author/:authorSlug').get(postsControllers.getPosts);
router.route('/series/:seriesSlug').get(postsControllers.getPosts);

/* Get one post by slug*/
router.route('/script/:slug').get(postsControllers.getPost);






export default router

