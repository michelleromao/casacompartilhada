import pool from "../database/index";

interface IToDo {
  task: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  day_of_month: number;
  day_of_week: string;
}

class ToDo{
  static async create(data: IToDo){
    try{
      const client = await pool.connect();
      const {
        task,
        frequency,
        day_of_week,
        day_of_month,
      } = data;
      if(frequency === 'daily'){
        const { rows: todo } = await client.query(
          'INSERT INTO todo (task, frequency) values ($1, $2) RETURNING *',
          [task, frequency]
        );
        await client.release();
        return todo;
      }else if(frequency === 'weekly'){
        const { rows: todo } = await client.query(
          'INSERT INTO todo (task, frequency, day_of_week) values ($1, $2, $3) RETURNING *',
          [task, frequency, day_of_week]
        );
        await client.release();
        return todo;
      }else if(frequency === 'monthly') {
        const { rows: todo } = await client.query(
          'INSERT INTO todo (task, frequency, day_of_month) values ($1, $2, $3) RETURNING *',
          [task, frequency, day_of_month]
        );
        await client.release();
        return todo;
      }
    }catch(err){
      console.log('Cant create an item to To Do list');
    }
    return null;
  }

  static async findAll(){
    try{
      const client = await pool.connect();
      const { rows: todo } = await client.query(
        'SELECT * FROM todo'
      );
      await client.release();
      return todo;
    }catch(err){
      console.log('Cant find all items of To Do List');
    }
    return null;
  }

  static async findById(todo_id : string){
    try{
      const client = await pool.connect();
      const { rows: todo } = await client.query(
        'SELECT * FROM todo T where T.id = $1',
        [todo_id]
      );
      await client.release();
      return todo;
    }catch(err){
      console.log('Cant find an item of To Do List');
    }
    return null;
  }

  static async update(data: IToDo, todo_id : string){
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
          'UPDATE todo T SET task = $1, frequency = $2 WHERE T.id = $3',
          [task, frequency, todo_id]
        );
        await client.release();
        return todo;
      }else if(frequency==='weekly'){
        const { rows: todo } = await client.query(
          'UPDATE todo T SET task = $1, frequency = $2, day_of_week = $3 WHERE T.id = $4',
          [task, frequency, day_of_week, todo_id]
        );
        await client.release();
        return todo;
      }else if(frequency==='monthly'){
        const { rows: todo } = await client.query(
          'UPDATE todo T SET task = $1, frequency = $2, day_of_month = $3 WHERE T.id = $4',
          [task, frequency, day_of_month, todo_id]
        );
        await client.release();
        return todo;
      }
    }catch(err){
      console.log('Cant update an item of To Do List');
    }
    return null;
  }

  static async findByIdAndDelete(todo_id : string){
    try{
      const client = await pool.connect();
      const { rows: todo } = await client.query(
        'DELETE FROM todo T where T.id = $1',
        [todo_id]
      );
      await client.release();
      return todo;
    }catch(err){
      console.log('Cant delete an item of To Do List');
    }
    return null;
  }
}

export default ToDo;
