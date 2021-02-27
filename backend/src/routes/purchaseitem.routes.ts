import {Router} from 'express';

const purchaseItemRoutes = Router();

purchaseItemRoutes.get("/", (request, response) => {
  return response.json({message: "GET Purchase Item"})
});

purchaseItemRoutes.get("/:id", (request, response) => {
  return response.json({message: "GET Purchase Item :id"})
});

purchaseItemRoutes.post("/", (request, response) => {
  return response.json({message: "POST Purchase Item"})
});

purchaseItemRoutes.put("/:id", (request, response) => {
  return response.json({message: "PUT Purchase Item :id"})
});

purchaseItemRoutes.delete("/:id", (request, response) => {
  return response.json({message: "DELETE Purchase Item :id"})
});

export default purchaseItemRoutes;
