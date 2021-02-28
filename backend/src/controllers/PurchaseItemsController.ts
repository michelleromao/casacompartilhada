import {Request, Response} from 'express';
import PurchaseItems from "../models/PurchaseItems";
import IndexPurchaseItemDTO from "../interfaces/IndexPurchaseItemDTO";
import CreatePurchaseItemDTO from "../interfaces/CreatePurchaseItemDTO";

export = {
  async index(request: Request, response: Response){
    try{
      const { status } = request.query;
      const { home_id } = request.body;
      const find = await PurchaseItems.findByStatus(status, home_id);
      const purchase_items = find?.map((purchase_item: IndexPurchaseItemDTO) => {
        return ({id: purchase_item.id,
          item: purchase_item.item,
          status: purchase_item.status,
          creator_id: purchase_item.creator_id,
          buyer_id: purchase_item.buyer_id});
      });
      if(purchase_items){
        return response.json(purchase_items);
      }
    }catch(err){
      console.log(err);
    }
  },

  async findOne(request: Request, response: Response){
    try{
      const {id} = request.params;
      const find = await PurchaseItems.findById(id);
      const purchase_item = find?.map((purchase_item : IndexPurchaseItemDTO) =>{
        return ({id: purchase_item.id,
          item: purchase_item.item,
          status: purchase_item.status,
          creator_id: purchase_item.creator_id,
          buyer_id: purchase_item.buyer_id});
      });
      if(purchase_item){
        return response.json(purchase_item[0]);
      }
    }catch(err){
      console.log(err);
    }
  },

  async store(request: Request, response: Response){
    try{
      const { item, creator_id, home_id } : CreatePurchaseItemDTO = request.body;
      const purchase_item = await PurchaseItems.create({item, creator_id, home_id});
      return response.json(purchase_item);
    }catch(err){
      console.log(err);
    }
  },

  async update(request: Request, response: Response){
    try{
      const { id } = request.params;
      const { item, status, creator_id } = request.body;
      const purchase_item = await PurchaseItems.update({item, status},id,creator_id);
      return response.json(purchase_item);
    }catch(err){
      console.log(err);
    }
  },

  async delete(request: Request, response: Response){
    try{
      const { id } = request.params;
      const { creator_id } = request.body;
      await PurchaseItems.findByIdAndDelete(id, creator_id);
      return response.json({message: 'Purchase item deleted'});
    }catch(err){
      console.log(err);
    }
  }
}
