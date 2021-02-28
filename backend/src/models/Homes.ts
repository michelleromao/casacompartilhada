import pool from "../database/index";

interface IHome {
  name: string;
  creator_id: string;
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
        'INSERT INTO home (name, creator_id) values ($1, $2) RETURNING *',
        [name, creator_id]
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

  static async update(data: IHome, creator_id: string){
    try{
      const client = await pool.connect();
      const {
        name
      } = data;
      const { rows: home } = await client.query(
        'UPDATE home H SET name = $1 WHERE H.creator_id = $2',
        [name, creator_id]
      );
      await client.release();
      return home;
    }catch(err){
      console.log('Cant update a home');
    }
    return null;
  }

  static async findByIdAndDelete(home_id: string, creator_id: string){
    try{
      const client = await pool.connect();
      const { rows: home } = await client.query(
        'DELETE FROM home H where H.id = $1 AND H.creator_id = $2',
        [home_id, creator_id]
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
