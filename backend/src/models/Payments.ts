import pool from "../database/index";

interface IPayments {
  payer_id: string;
  bill_id: string;
}

class Payments{
  static async create(data: IPayments){
    try{
      const client = await pool.connect();
      const {
        payer_id,
        bill_id,
      } = data;
     await client.query(
        'SELECT bill_status_paid($1)',
        [bill_id]
      );
      await client.release();

      const { rows: payments } = await client.query(
        'INSERT INTO payments (payer_id, bill_id) values ($1, $2) RETURNING *',
        [payer_id, bill_id]
      );
      await client.release();
      return payments;
    }catch(err){
      console.log('Cant create a payment');
    }
    return null;
  }

  static async findAll(){
    try{
      const client = await pool.connect();
      const { rows: payments } = await client.query(
        'SELECT * FROM payments'
      );
      await client.release();
      return payments;
    }catch(err){
      console.log('Cant find all payments');
    }
    return null;
  }

  static async findById(pay_id: string){
    try{
      const client = await pool.connect();
      const { rows: payments } = await client.query(
        'SELECT * FROM payments P where P.id = $1',
        [pay_id]
      );
      await client.release();
      return payments;
    }catch(err){
      console.log('Cant find a payment');
    }
    return null;
  }

  static async findByPayerId(payer_id: string){
    try{
      const client = await pool.connect();
      const { rows: payments } = await client.query(
        'SELECT * FROM payments P where P.payer_id = $1',
        [payer_id]
      );
      await client.release();
      return payments;
    }catch(err){
      console.log('Cant find a payment');
    }
    return null;
  }

  static async findByBillId(bill_id: string){
    try{
      const client = await pool.connect();
      const { rows: payments } = await client.query(
        'SELECT * FROM payments P where P.bill_id = $1',
        [bill_id]
      );
      await client.release();
      return payments;
    }catch(err){
      console.log('Cant find a payment');
    }
    return null;
  }
}

export default Payments;
