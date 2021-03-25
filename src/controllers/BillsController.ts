import { Request, Response } from 'express';
import Bills from "../models/Bills";
import IndexBillDTO from "../interfaces/IndexBillDTO";
import CreateBillDTO from "../interfaces/CreateBillDTO";

export = {
  async index(request: Request, response: Response) {
    try {
      const { status, type, home_id } = request.query;
      const statusStr = String(status);
      const typeStr = String(type);
      const home_idStr = String(home_id);
      if (status) {
        const find = await Bills.findByStatus(statusStr, home_idStr);
        const bills = find?.map((bill: IndexBillDTO) => {
          return ({
            id: bill.id,
            name: bill.name,
            responsible_id: bill.responsible_id,
            due: bill.due,
            value: bill.value,
            home: bill.home,
            status: bill.status,
            creator_id: bill.creator_id,
            home_id: bill.home_id,
          });
        });
        if (bills) {
          return response.json(bills);
        }
      } else if (type) {
        const find = await Bills.findByType(typeStr, home_idStr);
        const bills = find?.map((bill: IndexBillDTO) => {
          return ({
            id: bill.id,
            name: bill.name,
            responsible_id: bill.responsible_id,
            due: bill.due,
            value: bill.value,
            home: bill.home,
            status: bill.status,
            creator_id: bill.creator_id,
            home_id: bill.home_id,
          });
        })
        if (bills) {
          return response.json(bills);
        }
      }
    } catch (err) {
      console.log(err);
    }
  },

  async findOne(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const find = await Bills.findById(id);
      const bill = find?.map((bill: IndexBillDTO) => {
        return ({
          id: bill.id,
          name: bill.name,
          responsible_id: bill.responsible_id,
          due: bill.due,
          value: bill.value,
          home: bill.home,
          status: bill.status,
          creator_id: bill.creator_id,
        });
      });
      if (bill) {
        return response.json(bill);
      }
    } catch (err) {
      console.log(err);
    }
  },

  async store(request: Request, response: Response) {
    try {
      const {
        name,
        responsible_id,
        due,
        value,
        home,
        creator_id,
        home_id }: CreateBillDTO = request.body;
      const bill = await Bills.create({
        name,
        responsible_id,
        due,
        value,
        home,
        creator_id,
        home_id
      });
      return response.json(bill);
    } catch (err) {
      console.log(err);
    }
  },

  async update(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const {
        name,
        responsible_id,
        due,
        value,
        home,
        creator_id,
        home_id
      } = request.body;
      const bill = await Bills.update({
        name,
        responsible_id,
        due,
        value,
        home
      }, id, creator_id, home_id);
      return response.json(bill);
    } catch (err) {
      console.log(err);
    }
  },

  async delete(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { creator_id } = request.body;
      const bill = await Bills.findByIdAndDelete(id, creator_id);
      return response.json({ message: 'Bill deleted' });
    } catch (err) {
      console.log(err);
    }
  }
}
