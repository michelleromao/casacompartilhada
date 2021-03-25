import {Request, Response} from 'express';
import Payments from "../models/Payments";
import IndexPaymentDTO from "../interfaces/IndexPaymentDTO";

export = {
  async index(request: Request, response: Response){
    try{
      const { home_id } = request.query;
      const home_idStr = String(home_id);
      const find = await Payments.findByHomeId(home_idStr);
      return response.json(find);
    }catch(err){
      console.log(err);
    }
  },

  async store(request: Request, response: Response){
    try{
      const {bill_id, payer_id} = request.body;
      const payment = await Payments.create({payer_id, bill_id});
      return response.json(payment);
    }catch(err){
      console.log(err);
    }
  },

}
