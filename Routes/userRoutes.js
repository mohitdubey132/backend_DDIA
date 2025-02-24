import {Router} from 'express';
import { createUser, login ,getUsers } from '../Controller/UserController.js';

const router = Router()

router.post('/',createUser)
router.post('/login',login)
router.get("/users",getUsers)

export default router;