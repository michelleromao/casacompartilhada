import {Router} from 'express';
import HomesController from '../controllers/HomesController'

const homeRoutes = Router();

homeRoutes.get("/", HomesController.index);
homeRoutes.get("/:id", HomesController.findOne);
homeRoutes.post("/",  HomesController.store);
homeRoutes.put("/:id",  HomesController.update);
homeRoutes.delete("/:id", HomesController.delete);

export default homeRoutes;
