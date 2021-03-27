import {Router} from 'express';
import UsersController from '../controllers/UsersController'

const userRoutes = Router();

userRoutes.get("/", UsersController.index);
userRoutes.get("/:id", UsersController.findOne);
userRoutes.post("/",  UsersController.store);
userRoutes.put("/:id",  UsersController.update);
userRoutes.delete("/:id", UsersController.delete);

export default userRoutes;
