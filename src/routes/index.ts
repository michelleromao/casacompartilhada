import {Router} from 'express';
import homeRoutes from './home.routes';
import userRoutes from './user.routes';
import todoRoutes from './todo.routes';
import doesRoutes from "./does.routes";
import ruleRoutes from './rule.routes';
import purchaseItemRoutes from './purchaseitem.routes';
import billRoutes from './bill.routes';
import payRoutes from './pay.routes';

const routes = Router();

routes.use('/home/', homeRoutes);
routes.use('/user/', userRoutes);
routes.use('/todo/', todoRoutes);
routes.use('/does/', doesRoutes);
routes.use('/rule/', ruleRoutes);
routes.use('/purchaseitem/', purchaseItemRoutes);
routes.use('/bill/', billRoutes);
routes.use('/pay/', payRoutes);


export default routes;
