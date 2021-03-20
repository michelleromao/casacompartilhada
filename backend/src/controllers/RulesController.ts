import {Request, Response} from 'express';
import Rules from "../models/Rules";
import IndexRulesDTO from "../interfaces/IndexRulesDTO";
import CreateRulesDTO from "../interfaces/CreateRulesDTO";

export = {
  async index(request: Request, response: Response){
    try{
      const {home_id} = request.query;
      const find = await Rules.findByHomeId(home_id);
      const rules = find?.map((rule: IndexRulesDTO) => {
        return ({id: rule.id, description: rule.description, cretor_id: rule.creator_id})
      })
      if(rules){
        return response.json(rules);
      }
    }catch(err){
      console.log(err);
    }
  },

  async findOne(request: Request, response: Response){
    try{
      const { id } = request.params;
      const find = await Rules.findById(id);
      const rule = find?.map((rule: IndexRulesDTO) =>{
        return ({id: rule.id, description: rule.description, cretor_id: rule.creator_id});
      })
      if(rule){
        return response.json(rule[0]);
      }
    }catch(err){
      console.log(err);
    }
  },

  async store(request: Request, response: Response){
    try{
      const { description, creator_id, home_id } : CreateRulesDTO = request.body;
      const rule = await Rules.create({description, creator_id, home_id});
      return response.json(rule);
    }catch(err){
      console.log(err);
    }
  },

  async update(request: Request, response: Response){
    try{
      const { id } = request.params;
      const { description, creator_id } = request.body;
      const rule = await Rules.update({description},id,creator_id);
      return response.json(rule);
    }catch(err){
      console.log(err);
    }
  },

  async delete(request: Request, response: Response){
    try{
      const { id } = request.params;
      const { cretor_id } = request.body;
      await Rules.findByIdAndDelete(id, cretor_id);
      return response.json({message: 'Rule deleted'});
    }catch(err){
      console.log(err);
    }
  }
}
