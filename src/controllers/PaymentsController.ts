import {Request, Response} from 'express';
import Payments from "../models/Payments";
import IndexPaymentDTO from "../interfaces/IndexPaymentDTO";

export = {
  async index(request: Request, response: Response){
    try{
      const { bill_id } = request.query;
      const find = await Payments.findByBillId(bill_id);
      const payment = find?.map((payment : IndexPaymentDTO) => {
        return({
          payer_id: payment.payer_id,
          bill_id: payment.bill_id,
        });
      })
      if(payment){
        return response.json(payment);
      }
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
