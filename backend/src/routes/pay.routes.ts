import {Router} from 'express';

const payRoutes = Router();

payRoutes.get("/", (request, response) => {
  return response.json({message: "GET Pay"})
});

payRoutes.get("/:id", (request, response) => {
  return response.json({message: "GET Pay :id"})
});

payRoutes.post("/", (request, response) => {
  return response.json({message: "POST Pay"})
});


export default payRoutes;
