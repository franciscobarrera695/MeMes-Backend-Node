import {Router} from 'express';


import {getPosts,createPost,updatedPost,deletePost,getPostsGlobal} from '../controllers/post.controller.js'
import { verifyToken } from '../middlewares/verifyToken.js';

const router = Router()

router.get('/post',verifyToken,getPosts)
router.post('/post',verifyToken,createPost)
router.put('/post/:id',verifyToken,updatedPost)
router.delete('/post/:id',verifyToken,deletePost)

router.get('/post-global',getPostsGlobal)





export default router