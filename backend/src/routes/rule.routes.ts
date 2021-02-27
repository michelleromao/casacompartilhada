import {Router} from 'express';

const ruleRoutes = Router();

ruleRoutes.get("/", (request, response) => {
  return response.json({message: "GET Rule"})
});

ruleRoutes.get("/:id", (request, response) => {
  return response.json({message: "GET Rule :id"})
});

ruleRoutes.post("/", (request, response) => {
  return response.json({message: "POST Rule"})
});

ruleRoutes.put("/:id", (request, response) => {
  return response.json({message: "PUT Rule :id"})
});

ruleRoutes.delete("/:id", (request, response) => {
  return response.json({message: "DELETE Rule :id"})
});

export default ruleRoutes;
