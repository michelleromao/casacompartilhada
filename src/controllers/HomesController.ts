import {Request, Response} from 'express';
import Homes from "../models/Homes";
import CreateHomeDTO from "../interfaces/CreateHomeDTO";
import IndexHomeDTO from "../interfaces/IndexHomeDTO";
import UpdateHomeDTO from "../interfaces/UpdateHomeDTO";
import DeleteHomeDTO from "../interfaces/DeleteHomeDTO";

export = {
  async findOne(request: Request, response: Response){
    try{
      const { id } = request.params;
      const find = await Homes.findById(id);
      const home = find?.map((home: IndexHomeDTO) => {
        return ({id: home.id, name: home.name, creator_id: home.creator_id});
      })
      if(home){
        return response.json(home[0]);
      }
    }catch(err){
      console.log(err);
    }
  },

  async store(request: Request, response: Response){
    try{
      const { name, creator_id } : CreateHomeDTO = request.body;
      const home = await Homes.create({name, creator_id});
      return response.json(home);
    }catch(err){
      console.log(err);
    }
  },

  async update(request: Request, response: Response){
    try{
      const {
        name,
        creator_id
      } = request.body;
      const { id } = request.params;
      const updatedHome = await Homes.update(name, id, creator_id);
      return response.json(updatedHome);

    }catch(err){
      console.log(err);
    }
  },

  async delete(request: Request, response: Response){
    try{
      const { id } = request.params;
      const { creator_id } = request.body;
      await Homes.findByIdAndDelete(id, creator_id);
      return response.json({message: 'Home deleted'});
    }catch(err){
      console.log(err);
    }
  }
}
