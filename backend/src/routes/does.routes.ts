import {Router} from 'express';

const doesRoutes = Router();

doesRoutes.get("/", (request, response) => {
  return response.json({message: "GET Does"})
});

doesRoutes.get("/:id", (request, response) => {
  return response.json({message: "GET Does :id"})
});

doesRoutes.post("/", (request, response) => {
  return response.json({message: "POST Does"})
});


export default doesRoutes;
