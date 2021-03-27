import {Router} from 'express';
import RulesController from '../controllers/RulesController'

const ruleRoutes = Router();

ruleRoutes.get("/", RulesController.index);
ruleRoutes.get("/:id", RulesController.findOne);
ruleRoutes.post("/",  RulesController.store);
ruleRoutes.put("/:id",  RulesController.update);
ruleRoutes.delete("/:id", RulesController.delete);

export default ruleRoutes;
