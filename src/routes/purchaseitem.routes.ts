import {Router} from 'express';
import PurchaseItemsController from '../controllers/PurchaseItemsController'

const purchaseItemRoutes = Router();

purchaseItemRoutes.get("/", PurchaseItemsController.index);
purchaseItemRoutes.get("/:id", PurchaseItemsController.findOne);
purchaseItemRoutes.post("/",  PurchaseItemsController.store);
purchaseItemRoutes.put("/:id",  PurchaseItemsController.update);
purchaseItemRoutes.delete("/:id", PurchaseItemsController.delete);

export default purchaseItemRoutes;
