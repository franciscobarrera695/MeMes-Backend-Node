import {Router} from 'express';


import {getPosts,createPost,updatedPost,deletePost} from '../controllers/post.controller.js'
import { verifyToken } from '../middlewares/verifyToken.js';

const router = Router()

router.get('/api/post',verifyToken,getPosts)
router.post('/api/post',verifyToken,createPost)
router.put('/api/post/:id',verifyToken,updatedPost)
router.delete('/api/post/:id',verifyToken,deletePost)





export default router