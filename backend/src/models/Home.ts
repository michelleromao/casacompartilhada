import pool from "../database/index";

interface IHome {
  name: string
}

class Home{
  static async create(data: IHome){
    try{
      const client = await pool.connect();
      const {
        name
      } = data;
      const { rows: home } = await client.query(
        'INSERT INTO home (name) values ($1) RETURNING *',
        [name]
      );
      await client.release();
      return home;
    }catch(err){
      console.log('Cant create a home');
    }
    return null;
  }

  static async findAll(){
    try{
      const client = await pool.connect();
      const { rows: homes } = await client.query(
        'SELECT * FROM home'
      );
      await client.release();
      return homes;
    }catch(err){
      console.log('Cant find all homes');
    }
    return null;
  }

  static async findById(home_id: string){
    try{
      const client = await pool.connect();
      const { rows: home } = await client.query(
        'SELECT * FROM home H where H.id = $1',
        [home_id]
      );
      await client.release();
      return home;
    }catch(err){
      console.log('Cant find a home');
    }
    return null;
  }

  static async update(data: IHome, user_id: string){
    try{
      const client = await pool.connect();
      const {
        name
      } = data;
      const { rows: home } = await client.query(
        'UPDATE home H SET name = $1 WHERE H.creator_id = $2',
        [name, user_id]
      );
      await client.release();
      return home;
    }catch(err){
      console.log('Cant update a home');
    }
    return null;
  }

  static async findByIdAndDelete(home_id: string, user_id: string){
    try{
      const client = await pool.connect();
      const { rows: home } = await client.query(
        'DELETE FROM home H where H.id = $1 AND H.creator_id = $2',
        [home_id, user_id]
      );
      await client.release();
      return home;
    }catch(err){
      console.log('Cant delete a home');
    }
    return null;
  }
}

export default Home;
