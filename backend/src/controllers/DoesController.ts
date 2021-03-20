import {Request, Response} from 'express';
import Does from "../models/Does";

export = {

  async store(request: Request, response: Response){
    try{
      const {id} = request.params;
      const {doer_id} = request.body;
      const does = await Does.create({todo_id: id, doer_id});
      return response.json(does);
    }catch(err){
      console.log(err);
    }
  },

}
