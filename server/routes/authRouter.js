import express from  'express';
import { userSignUp, userLogIn, verifyToken, logout } from '../controller/user-controller.js';

const authRouter = express.Router();

authRouter.post('/signup', userSignUp);
authRouter.post('/login', userLogIn);
authRouter.get('/logout', logout);
authRouter.get('/checkuser', verifyToken);

export default authRouter;