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
      const pay = await client.query(
        'SELECT bill_status_paid($1)',
        [bill_id]
      );
      const { rows: payments } = await client.query(
        'INSERT INTO payments (payer_id, bill_id) values ($1, $2) RETURNING *',
        [payer_id, bill_id]
      );
      await client.release();
      return payments;
    }catch(err){
      console.log(err);
    }
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
  }

  static async findByHomeId(home_id: string){
    try{
      const client = await pool.connect();
      const { rows: payments } = await client.query(
        'SELECT P.id as payment_id, U.id as payer_id, username, B.id as bill_id, B.name, P.created_at FROM users U INNER JOIN payments P ON U.id = P.payer_id INNER JOIN bills B ON B.home_id = U.home_id AND B.id = P.bill_id AND B.home_id = $1',
        [home_id]
      );
      await client.release();
      return payments;
    }catch(err){
      console.log('Cant find a payment');
    }
  }
}

export default Payments;
