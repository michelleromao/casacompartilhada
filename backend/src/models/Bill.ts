import pool from "../database/index";

interface IBill {
  name: string;
  responsible_id: string;
  due: Date;
  value: number;
  home: boolean;
  status: boolean;
}

class Bill{
  static async create(data: IBill){
    try{
      const client = await pool.connect();
      const {
        name,
        responsible_id,
        due,
        value,
        home,
      } = data;
      const { rows: bill } = await client.query(
        'INSERT INTO bill (name, responsible_id, due, value, home, status) values ($1, $2, $3, $4, $5, $6) RETURNING *',
        [name, responsible_id, due, value, home, false]
      );
      await client.release();
      return bill;
    }catch(err){
      console.log('Cant create a bill');
    }
    return null;
  }

  static async findAll(){
    try{
      const client = await pool.connect();
      const { rows: bills } = await client.query(
        'SELECT * FROM bill'
      );
      await client.release();
      return bills;

    }catch(err){
      console.log('Cant find all bills');
    }
    return null;
  }

  static async findById(bill_id: string){
    try{
      const client = await pool.connect();
      const { rows: bill } = await client.query(
        'SELECT * FROM bill B where B.id = $1',
        [bill_id]
      );
      await client.release();
      return bill;
    }catch(err){
      console.log('Cant find a bill');
    }
    return null;
  }

  static async update(data: IBill, bill_id: string){
    try{
      const client = await pool.connect();
      const {
        name,
        responsible_id,
        due,
        value,
        home,
        status
      } = data;
      const { rows: bill } = await client.query(
        'UPDATE bill B SET name = $1, responsible_id = $2, due = $3, value = $4, home = $5, status = $6 WHERE B.id = $7',
        [name, responsible_id, due, value, home, status, bill_id]
      );
      await client.release();
      return bill;
    }catch(err){
      console.log('Cant update a bill');
    }
    return null;
  }

  static async findByIdAndDelete(bill_id: string){
    try{
      const client = await pool.connect();
      const { rows: bill } = await client.query(
        'DELETE FROM bill B where B.id = $1',
        [bill_id]
      );
      await client.release();
      return bill;
    }catch(err){
      console.log('Cant delete a bill');
    }
    return null;
  }
}

export default Bill;
