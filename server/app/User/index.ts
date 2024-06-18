import express from 'express';

import { createUser, loginUser } from './userController';

const routes = express.Router();

routes.post('/createUser', createUser);
routes.post('/loginUser',loginUser)

export default routes;