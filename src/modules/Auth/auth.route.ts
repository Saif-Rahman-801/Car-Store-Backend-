import express from 'express';
import { login, register } from './auth.Controller';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);

export const authRoutes = router;
