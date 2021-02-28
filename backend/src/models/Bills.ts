import pool from "../database/index";

interface IBills {
  name: string;
  responsible_id: string;
  due: string;
  value: number;
  home: boolean;
  status?: boolean;
  creator_id?: string;
  home_id?: string;
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
  }

  static async findByStatus(status: string, home_id: string){
    try{
      const client = await pool.connect();
      const { rows: bills } = await client.query(
        'SELECT * FROM bills B where B.status = $1 AND home_id = $2',
        [status, home_id]
      );
      await client.release();
      return bills;
    }catch(err){
      console.log('Cant find the bills');
    }
  }

  static async update(data: IBills, bill_id: string, creator_id: string, home_id: string){
    try{
      const client = await pool.connect();
      const {
        name,
        responsible_id,
        due,
        value,
        home,
      } = data;
      const { rows: bills } = await client.query(
        'UPDATE bills B SET name = $1, responsible_id = $2, due = $3, value = $4, home = $5 WHERE B.id = $6 AND B.creator_id = $7 AND B.home_id = $8 RETURNING *',
        [name, responsible_id, due, value, home, bill_id, creator_id, home_id]
      );
      await client.release();
      return bills;
    }catch(err){
      console.log('Cant update a bill');
    }
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
  }
}

export default Bills;
