import {Router} from 'express';
import DoesController from '../controllers/DoesController'

const doesRoutes = Router();

doesRoutes.get("/", DoesController.index);
doesRoutes.get("/:id", DoesController.findOne);
doesRoutes.post("/",  DoesController.store);
doesRoutes.put("/:id",  DoesController.update);
doesRoutes.delete("/:id", DoesController.delete);

export default doesRoutes;
