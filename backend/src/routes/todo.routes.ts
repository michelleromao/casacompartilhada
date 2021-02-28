import {Router} from 'express';
import TodosController from '../controllers/TodosController'

const todoRoutes = Router();

todoRoutes.get("/", TodosController.index);
todoRoutes.get("/:id", TodosController.findOne);
todoRoutes.post("/",  TodosController.store);
todoRoutes.put("/:id",  TodosController.update);
todoRoutes.delete("/:id", TodosController.delete);

export default todoRoutes;
