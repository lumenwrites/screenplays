import { Router } from 'express'
const router = new Router()

/* Import controllers */
import * as postsControllers from '../controllers/posts.controllers';

/* Home */
/* router.route('/').get(postsControllers.home);*/
router.route('/').get(postsControllers.getPosts);

/* Get all Posts*/
router.route('/posts').get(postsControllers.getPosts);

/* Get one post by slug*/
router.route('/post/:slug').get(postsControllers.getPost);

export default router

