import {Router} from 'express';


import {register,login,list,me,updateProfile,updatePassword,updateImageProfile}from '../controllers/auth.controller.js'
import { verifyToken } from '../middlewares/verifyToken.js';

const router = Router()

router.post('/api/register',register)
router.post('/api/login',login)
router.get('/api/list',list)
router.get('/api/perfil',verifyToken,me)
router.put('/api/perfil/:id',verifyToken,updateProfile)
router.put('/api/actualizar-password',verifyToken,updatePassword)
router.put('/api/actualizar-imagen-perfil',verifyToken,updateImageProfile)
export default router