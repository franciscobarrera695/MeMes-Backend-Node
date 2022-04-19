import {Router} from 'express';


import * as authController from '../controllers/auth.controller.js'
import { verifyToken } from '../middlewares/verifyToken.js';

const router = Router()

router.post('/register',authController.register)
router.post('/login',authController.login)
router.get('/api/list',authController.list)
router.get('/perfil',verifyToken,authController.me)
router.put('/perfil/:id',verifyToken,authController.updateProfile)
router.put('/actualizar-password',verifyToken,authController.updatePassword)
export default router