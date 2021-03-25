import {Router} from 'express';
import UsersController from '../controllers/UsersController'

const loginRoutes = Router();

loginRoutes.post("/", UsersController.login);

export default loginRoutes;
