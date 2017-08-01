import express from 'express';

import authRouteHandler from './AuthRouteHandler';
import chatRouteHandler from './ChatRouteHandler';

const router = express.Router();

router.post('/users', authRouteHandler.registerUser);
router.post('/users/login', authRouteHandler.login);
router.get('/users/auth', authRouteHandler.checkIfAuthorized);
router.post('/users/logout', authRouteHandler.logout);

router.get('/api/v1/chatMessages', chatRouteHandler.newMessage);

export default router;