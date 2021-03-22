import {Router} from 'express';
import PaymentsController from '../controllers/PaymentsController'

const payRoutes = Router();

payRoutes.get("/", PaymentsController.index);
payRoutes.post("/",  PaymentsController.store);

export default payRoutes;
