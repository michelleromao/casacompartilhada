import pool from "../database/index";
import { format } from 'date-fns-tz';
import { startOfDay } from 'date-fns';

interface IToDos {
  task?: string;
  frequency?: 'daily' | 'weekly' | 'monthly';
  day_of_week?: string;
  day_of_month?: number;
  creator_id?: string;
  home_id?: string;
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
      const created: string = format(startOfDay((new Date())), 'yyyy-MM-dd HH:mm:SS.sssss');
      const updated: string = format(startOfDay((new Date())), 'yyyy-MM-dd HH:mm:SS.sssss');
      console.log(created, updated);
      if(frequency === 'daily'){
        const { rows: todo } = await client.query(
          'INSERT INTO todos (task, frequency, creator_id, home_id, created_at, updated_at) values ($1, $2, $3, $4, $5, $6) RETURNING *',
          [task, frequency, creator_id, home_id, created, updated]
        );
        await client.release();
        return todo;
      }else if(frequency === 'weekly'){
        const { rows: todo } = await client.query(
          'INSERT INTO todos (task, frequency, day_of_week, creator_id, home_id, created_at, updated_at) values ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
          [task, frequency, day_of_week, creator_id, home_id, created, updated]
        );
        await client.release();
        return todo;
      }else if(frequency === 'monthly') {
        const { rows: todo } = await client.query(
          'INSERT INTO todos (task, frequency, day_of_month, creator_id, home_id, created_at, updated_at) values ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
          [task, frequency, day_of_month, creator_id, home_id, created, updated]
        );
        await client.release();
        return todo;
      }
    }catch(err){
      console.log(err);
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

  static async findById(todo_id: string){
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

  static async findByIdHome(home_id: string){
    try{
      const client = await pool.connect();
      const { rows: todo } = await client.query(
        'SELECT * FROM todos T where T.home_id = $1',
        [home_id]
      );
      await client.release();
      return todo;
    }catch(err){
      console.log('Cant find items of ToDo List of a home');
    }

  }

  static async findByFrequency(home_id: string, frequency: string){
    try{
      const client = await pool.connect();
      const { rows: todo } = await client.query(
        'SELECT * FROM todos T where  frequency = $1 AND T.home_id = $2',
        [frequency, home_id]
      );
      await client.release();
      return todo;
    }catch(error){
      console.log("Cant find a todo by frequency");
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
      const now: string = format(startOfDay((new Date())), 'yyyy-MM-dd HH:mm:SS.sssss');
      if(frequency==='daily'){
        const { rows: todo } = await client.query(
          'UPDATE todos T SET task = $1, frequency = $2, updated_at = $3 WHERE T.id = $4 AND T.creator_id = $5 RETURNING *',
          [task, frequency, now, todo_id, creator_id]
        );
        await client.release();
        return todo;
      }else if(frequency==='weekly'){
        const { rows: todo } = await client.query(
          'UPDATE todos T SET task = $1, frequency = $2, day_of_week = $3, updated_at = $4 WHERE T.id = $5 AND T.creator_id = $6 RETURNING *',
          [task, frequency, day_of_week, now, todo_id, creator_id]
        );
        await client.release();
        return todo;
      }else if(frequency==='monthly'){
        const { rows: todo } = await client.query(
          'UPDATE todos T SET task = $1, frequency = $2, day_of_month = $3, updated_at = $4 WHERE T.id = $5 AND T.creator_id = $6 RETURNING *',
          [task, frequency, day_of_month, now, todo_id, creator_id]
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
