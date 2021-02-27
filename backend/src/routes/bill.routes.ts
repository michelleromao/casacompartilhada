import {Router} from 'express';

const billRoutes = Router();

billRoutes.get("/", (request, response) => {
  return response.json({message: "GET Bill"})
});

billRoutes.get("/:id", (request, response) => {
  return response.json({message: "GET Bill :id"})
});

billRoutes.post("/", (request, response) => {
  return response.json({message: "POST Bill"})
});

billRoutes.put("/:id", (request, response) => {
  return response.json({message: "PUT Bill :id"})
});

billRoutes.delete("/:id", (request, response) => {
  return response.json({message: "DELETE Bill :id"})
});

export default billRoutes;
