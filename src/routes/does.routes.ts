import {Router} from 'express';
import DoesController from '../controllers/DoesController'

const doesRoutes = Router();

doesRoutes.post("/",  DoesController.store);

export default doesRoutes;
