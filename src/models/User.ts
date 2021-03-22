import pool from "../database/index";
import ShowUserDTO from "../interfaces/ShowUserDTO";
import { format } from 'date-fns-tz';
interface IUsers {
  username: string;
  email: string;
  password: string;
  home_id?: string;
}

class Users{
  static async create(data: IUsers){
    try{
      const client = await pool.connect();
      const {
        username,
        email,
        password
      } = data;
      const { rows: user } = await client.query(
        'INSERT INTO users (username, email, password) values ($1, $2, $3) RETURNING *',
        [username, email, password]
      );
      await client.release();
      return user;
    }catch(err){
      console.log('Cant create an user');
    }
  }

  static async findAll(){
    try{
      const client = await pool.connect();
      const { rows: user } = await client.query(
        'SELECT * FROM users'
      );
      await client.release();
      return user;
    }catch(err){
      console.log('Cant find all users');
    }
  }

  static async findById(user_id: string){
    try{
      const client = await pool.connect();
      const { rows: user } = await client.query(
        'SELECT * FROM users U where U.id = $1',
        [user_id]
      );
      await client.release();
      return user;
    }catch(err){
      console.log('Cant find an user');
    }
  }

  static async findByHomeId(home_id: string){
    try{
      const client = await pool.connect();
      const { rows: user } = await client.query(
        'SELECT * FROM users U where U.home_id = $1',
        [home_id]
      );
      await client.release();
      return user;
    }catch(err){
      console.log('Cant find an user');
    }
  }

  static async update(data: IUsers, user_id: string){
    try{
      const client = await pool.connect();
      const {
        username,
        email,
        password,
        home_id
      } = data;
      const now: string = format((new Date()), "yyyy-MM-dd HH:mm:ss.ssss");
      const { rows: user } = await client.query(
        'UPDATE users U SET username = $1, email = $2, password = $3, home_id = $4, updated_at = $5 WHERE U.id = $6 RETURNING *',
        [username, email, password, home_id, now, user_id]
      );
      await client.release();
      return user;
    }catch(err){
      console.log(err);
    }
  }

  static async findByIdAndDelete(user_id: string){
    try{
      const client = await pool.connect();
      const objeto = await client.query(
        'DELETE FROM users U where U.id = $1',
        [user_id]
      );
      await client.release();
      if(objeto.rowCount !== 0){
        return ({message: 'deleted'});
      }else{
        return ({message: 'has not been deleted'});
      }
    }catch(err){
      console.log('Cant delete an user');
      return ({message: 'has not been deleted'});
    }
  }
}

export default Users;
