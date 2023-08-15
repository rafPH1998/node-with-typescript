import { Router } from "express";
import usersController  from '../controllers/usersController';

const router = Router();

router.get('/api/users', usersController.index)
router.post('/api/users', usersController.store)
router.get('/api/users/:idUser', usersController.show)
router.delete('/api/users/:idUser', usersController.destroy)

export default router;