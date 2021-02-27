import {Router} from 'express';

const todoRoutes = Router();

todoRoutes.get("/", (request, response) => {
  return response.json({message: "GET To Do"})
});

todoRoutes.get("/:id", (request, response) => {
  return response.json({message: "GET To Do :id"})
});

todoRoutes.post("/", (request, response) => {
  return response.json({message: "POST To Do"})
});

todoRoutes.put("/:id", (request, response) => {
  return response.json({message: "PUT To Do :id"})
});

todoRoutes.delete("/:id", (request, response) => {
  return response.json({message: "DELETE To Do :id"})
});

export default todoRoutes;
