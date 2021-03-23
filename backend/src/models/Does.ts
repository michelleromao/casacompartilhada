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
        'SELECT distinct on(todo_id) D.* FROM does D order by todo_id, created_at desc'
      );
      await client.release();
      return does;
    }catch(err){
      console.log('Cant find a does');
    }
  }

  static async findTodosDone(home_id: string){
    try{
      const client = await pool.connect();
      const { rows: does } = await client.query(
        'SELECT D.id as does_id, U.id as doer_id, username, D.todo_id, T.task, T.day_of_week, T.day_of_month, D.created_at from users U inner join does D ON D.doer_id = U.id INNER JOIN todos T ON D.todo_id = T.id AND U.home_id = T.home_id AND T.home_id = $1',
        [home_id]
      );
      await client.release();
      return does;
    }catch(err){
      console.log('Cant find a the todos done');
    }
  }
}

export default Does;
