import {Router} from 'express';

const userRoutes = Router();

userRoutes.get("/", (request, response) => {
  return response.json({message: "GET User"})
});

userRoutes.get("/:id", (request, response) => {
  return response.json({message: "GET User :id"})
});

userRoutes.post("/", (request, response) => {
  return response.json({message: "POST User"})
});

userRoutes.put("/:id", (request, response) => {
  return response.json({message: "PUT User :id"})
});

userRoutes.delete("/:id", (request, response) => {
  return response.json({message: "DELETE User :id"})
});

export default userRoutes;
