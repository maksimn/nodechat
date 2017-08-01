import express from 'express';

import AuthRouteHandler from './AuthRouteHandler';
import ChatRouteHandler from './ChatRouteHandler';

const authRouteHandler = new AuthRouteHandler();
const chatRouteHandler = new ChatRouteHandler();
const router = express.Router();

router.post('/users', authRouteHandler.registerUser());
router.post('/users/login', authRouteHandler.login());
router.get('/users/auth', authRouteHandler.checkIfAuthorized());
router.post('/users/logout', authRouteHandler.logout());

router.get('/api/v1/chatMessages', chatRouteHandler.getMessages());

export default router;