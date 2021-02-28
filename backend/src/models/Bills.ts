import pool from "../database/index";

interface IBills {
  name: string;
  responsible_id: string;
  due: Date;
  value: number;
  home: boolean;
  status: boolean;
  creator_id: string;
  home_id: string;
}

class Bills{
  static async create(data: IBills){
    try{
      const client = await pool.connect();
      const {
        name,
        responsible_id,
        due,
        value,
        home,
        creator_id,
        home_id,
      } = data;
      const { rows: bills } = await client.query(
        'INSERT INTO bills (name, responsible_id, due, value, home, status, creator_id, home_id) values ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
        [name, responsible_id, due, value, home, false, creator_id, home]
      );
      await client.release();
      return bills;
    }catch(err){
      console.log('Cant create a bill');
    }
    return null;
  }

  static async findAll(){
    try{
      const client = await pool.connect();
      const { rows: bills } = await client.query(
        'SELECT * FROM bills'
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
      const { rows: bills } = await client.query(
        'SELECT * FROM bills B where B.id = $1',
        [bill_id]
      );
      await client.release();
      return bills;
    }catch(err){
      console.log('Cant find a bill');
    }
    return null;
  }

  static async findByHomeId(home_id: string){
    try{
      const client = await pool.connect();
      const { rows: bills } = await client.query(
        'SELECT * FROM bills B where B.home_id = $1',
        [home_id]
      );
      await client.release();
      return bills;
    }catch(err){
      console.log('Cant find a bill');
    }
    return null;
  }

  static async update(data: IBills, bill_id: string, creator_id: string){
    try{
      const client = await pool.connect();
      const {
        name,
        responsible_id,
        due,
        value,
        home,
        status,
      } = data;
      const { rows: bills } = await client.query(
        'UPDATE bills B SET name = $1, responsible_id = $2, due = $3, value = $4, home = $5, status = $6 WHERE B.id = $7 AND b.creator_id = $8',
        [name, responsible_id, due, value, home, status, bill_id, creator_id]
      );
      await client.release();
      return bills;
    }catch(err){
      console.log('Cant update a bill');
    }
    return null;
  }

  static async findByIdAndDelete(bill_id: string, creator_id: string){
    try{
      const client = await pool.connect();
      const { rows: bills } = await client.query(
        'DELETE FROM bills B where B.id = $1 AND B.creator_id = $2',
        [bill_id, creator_id]
      );
      await client.release();
      return bills;
    }catch(err){
      console.log('Cant delete a bill');
    }
    return null;
  }
}

export default Bills;
