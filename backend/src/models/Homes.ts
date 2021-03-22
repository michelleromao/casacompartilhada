import pool from "../database/index";
import { format } from 'date-fns-tz';

interface IHome {
  name: string;
  creator_id?: string;
}

class Home{
  static async create(data: IHome){
    try{
      const client = await pool.connect();
      const {
        name,
        creator_id
      } = data;
      const { rows: home } = await client.query(
        'INSERT INTO homes (name, creator_id) values ($1, $2) RETURNING *',
        [name, creator_id]
      );
      await client.release();
      return home;
    }catch(err){
      console.log('Cant create a home');
    }
  }

  static async findAll(){
    try{
      const client = await pool.connect();
      const { rows: homes } = await client.query(
        'SELECT * FROM homes'
      );
      await client.release();
      return homes;
    }catch(err){
      console.log('Cant find all homes');
    }
  }

  static async findById(home_id: string){
    try{
      const client = await pool.connect();
      const { rows: home } = await client.query(
        'SELECT * FROM homes H where H.id = $1',
        [home_id]
      );
      await client.release();
      return home;
    }catch(err){
      console.log('Cant find a home');
    }
  }

  static async update(data: IHome, creator_id: string){
    try{
      const client = await pool.connect();
      const {
        name
      } = data;

      const now: string = format((new Date()), "yyyy-MM-dd HH:mm:ss.ssss");
      const { rows: home } = await client.query(
        'UPDATE homes H SET name = $1, updated_at = $2 WHERE H.creator_id = $3 RETURNING *',
        [name, now, creator_id]
      );
      await client.release();
      return home;
    }catch(err){
      console.log('Cant update a home');
    }
  }

  static async findByIdAndDelete(home_id: string, creator_id: string){
    try{
      const client = await pool.connect();
      const { rows: home } = await client.query(
        'DELETE FROM homes H where H.id = $1 AND H.creator_id = $2',
        [home_id, creator_id]
      );
      const {rows : find} = await client.query(
        'SELECT * FROM homes H where H.id = $1',  [home_id]);
      await client.release();
      if(find.length !== 0){
        return ({message: 'has not been deleted'});
      }else{
        return ({message: 'deleted'});
      }
    }catch(err){
      console.log('Cant delete a home');
      return ({message: 'has not been deleted'});
    }
  }
}

export default Home;
