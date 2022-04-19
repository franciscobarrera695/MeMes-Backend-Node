import {Router} from 'express';


import * as authController from '../controllers/auth.controller.js'
import { verifyToken } from '../middlewares/verifyToken.js';

const router = Router()

router.post('/api/register',authController.register)
router.post('/api/login',authController.login)
router.get('/api/list',authController.list)
router.get('/api/perfil',verifyToken,authController.me)
router.put('/api/perfil/:id',verifyToken,authController.updateProfile)
router.put('/api/actualizar-password',verifyToken,authController.updatePassword)
export default router