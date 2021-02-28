import pool from "../database/index";

interface IToDos {
  task: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  day_of_week: string;
  day_of_month: number;
  creator_id: string;
  home_id: string;
}

class ToDos{
  static async create(data: IToDos){
    try{
      const client = await pool.connect();
      const {
        task,
        frequency,
        day_of_week,
        day_of_month,
        creator_id,
        home_id
      } = data;
      if(frequency === 'daily'){
        const { rows: todo } = await client.query(
          'INSERT INTO todos (task, frequency, creator_id, home_id) values ($1, $2, $3, $4) RETURNING *',
          [task, frequency, creator_id, home_id]
        );
        await client.release();
        return todo;
      }else if(frequency === 'weekly'){
        const { rows: todo } = await client.query(
          'INSERT INTO todos (task, frequency, day_of_week, creator_id, home_id) values ($1, $2, $3, $4, $5) RETURNING *',
          [task, frequency, day_of_week, creator_id, home_id]
        );
        await client.release();
        return todo;
      }else if(frequency === 'monthly') {
        const { rows: todo } = await client.query(
          'INSERT INTO todos (task, frequency, day_of_month, creator_id, home_id) values ($1, $2, $3, $4, $5) RETURNING *',
          [task, frequency, day_of_month, , creator_id, home_id]
        );
        await client.release();
        return todo;
      }
    }catch(err){
      console.log('Cant create an item to To Do list');
    }
  }

  static async findAll(){
    try{
      const client = await pool.connect();
      const { rows: todo } = await client.query(
        'SELECT * FROM todos'
      );
      await client.release();
      return todo;
    }catch(err){
      console.log('Cant find all items of To Do List');
    }
  }

  static async findById(todo_id : string){
    try{
      const client = await pool.connect();
      const { rows: todo } = await client.query(
        'SELECT * FROM todos T where T.id = $1',
        [todo_id]
      );
      await client.release();
      return todo;
    }catch(err){
      console.log('Cant find an item of To Do List');
    }
  }

  static async update(data: IToDos, todo_id: string, creator_id: string){
    try{
      const client = await pool.connect();
      const {
        task,
        frequency,
        day_of_week,
        day_of_month,
      } = data;
      if(frequency==='daily'){
        const { rows: todo } = await client.query(
          'UPDATE todos T SET task = $1, frequency = $2 WHERE T.id = $3 AND T.creator_id = $4 RETURNING *',
          [task, frequency, todo_id, creator_id]
        );
        await client.release();
        return todo;
      }else if(frequency==='weekly'){
        const { rows: todo } = await client.query(
          'UPDATE todos T SET task = $1, frequency = $2, day_of_week = $3 WHERE T.id = $4 AND T.creator_id = $5 RETURNING *',
          [task, frequency, day_of_week, todo_id, creator_id]
        );
        await client.release();
        return todo;
      }else if(frequency==='monthly'){
        const { rows: todo } = await client.query(
          'UPDATE todos T SET task = $1, frequency = $2, day_of_month = $3 WHERE T.id = $4 AND T.creator_id = $5 RETURNING *',
          [task, frequency, day_of_month, todo_id, creator_id]
        );
        await client.release();
        return todo;
      }
    }catch(err){
      console.log('Cant update an item of To Do List');
    }
  }

  static async findByIdAndDelete(todo_id: string, creator_id: string){
    try{
      const client = await pool.connect();
      const { rows: todo } = await client.query(
        'DELETE FROM todos T where T.id = $1 AND T.creator_id = $2',
        [todo_id, creator_id]
      );
      await client.release();
      return todo;
    }catch(err){
      console.log('Cant delete an item of To Do List');
    }
  }
}

export default ToDos;
