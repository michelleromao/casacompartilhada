import pool from "../database/index";

interface IDoes {
  doer_id: string;
  todo_id: string;
}

class Does{
  static async create(data: IDoes){
    try{
      const client = await pool.connect();
      const {
        doer_id,
        todo_id,
      } = data;
      const { rows: does } = await client.query(
        'INSERT INTO does (doer_id, todo_id) values ($1, $2) RETURNING *',
        [doer_id, todo_id]
      );
      await client.release();
      return does;
    }catch(err){
      console.log('Cant create a does');
    }
  }

  static async findAll(){
    try{
      const client = await pool.connect();
      const { rows: does } = await client.query(
        'SELECT * FROM does'
      );
      await client.release();
      return does;
    }catch(err){
      console.log('Cant find all does');
    }
  }

  static async findById(does_id: string){
    try{
      const client = await pool.connect();
      const { rows: does } = await client.query(
        'SELECT * FROM does D where D.id = $1',
        [does_id]
      );
      await client.release();
      return does;
    }catch(err){
      console.log('Cant find a does');
    }
  }

  static async findByDoerId(doer_id: string){
    try{
      const client = await pool.connect();
      const { rows: does } = await client.query(
        'SELECT * FROM does D where D.doer_id = $1',
        [doer_id]
      );
      await client.release();
      return does;
    }catch(err){
      console.log('Cant find a does');
    }
  }

  static async findByToDoId(todo_id: string){
    try{
      const client = await pool.connect();
      const { rows: does } = await client.query(
        'SELECT * FROM does D where D.todo_id = $1',
        [todo_id]
      );
      await client.release();
      return does;
    }catch(err){
      console.log('Cant find a does');
    }
  }
}

export default Does;
