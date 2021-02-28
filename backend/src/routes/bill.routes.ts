import {Router} from 'express';
import BillsController from '../controllers/BillsController'

const billRoutes = Router();

billRoutes.get("/", BillsController.index);
billRoutes.get("/:id", BillsController.findOne);
billRoutes.post("/",  BillsController.store);
billRoutes.put("/:id",  BillsController.update);
billRoutes.delete("/:id", BillsController.delete);

export default billRoutes;
