import {Router} from 'express';


import {register,login,list,me,updateProfile,updatePassword,updateImageProfile}from '../controllers/auth.controller.js'
import { verifyToken } from '../middlewares/verifyToken.js';

const router = Router()

router.post('/register',register)
router.post('/login',login)
router.get('/list',list)
router.get('/perfil',verifyToken,me)
router.put('/perfil/:id',verifyToken,updateProfile)
router.put('/actualizar-password',verifyToken,updatePassword)
router.put('/actualizar-imagen-perfil',verifyToken,updateImageProfile)
export default router