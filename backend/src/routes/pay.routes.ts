import {Router} from 'express';
import PaymentsController from '../controllers/PaymentsController'

const payRoutes = Router();

payRoutes.get("/", PaymentsController.index);
payRoutes.get("/:id", PaymentsController.findOne);
payRoutes.post("/",  PaymentsController.store);
payRoutes.put("/:id",  PaymentsController.update);
payRoutes.delete("/:id", PaymentsController.delete);

export default payRoutes;
