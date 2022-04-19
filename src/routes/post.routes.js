import {Router} from 'express';


import * as postController from '../controllers/post.controller.js'
import { verifyToken } from '../middlewares/verifyToken.js';

const router = Router()

router.get('/api/post',verifyToken,postController.getPosts)
router.post('/api/post',verifyToken,postController.createPost)
router.put('/api/post/:id',verifyToken,postController.updatedPost)
router.delete('/api/post/:id',verifyToken,postController.deletePost)





export default router