import {Router} from 'express';

const homeRoutes = Router();

homeRoutes.get("/", (request, response) => {
  return response.json({message: "GET Home"})
});

homeRoutes.get("/:id", (request, response) => {
  return response.json({message: "GET Home :id"})
});

homeRoutes.post("/", (request, response) => {
  return response.json({message: "POST Home"})
});

homeRoutes.put("/:id", (request, response) => {
  return response.json({message: "PUT Home :id"})
});

homeRoutes.delete("/:id", (request, response) => {
  return response.json({message: "DELETE Home :id"})
});

export default homeRoutes;
