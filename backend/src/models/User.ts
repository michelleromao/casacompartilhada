import pool from "../database/index";

interface IUser {
  username: string;
  email: string;
  password: string;
}

class User{
  static async create(data: IUser){
    try{
      const client = await pool.connect();
      const {
        username,
        email,
        password
      } = data;
      const { rows: user } = await client.query(
        'INSERT INTO user (username, email, password) values ($1, $2, $3) RETURNING *',
        [username, email, password]
      );
      await client.release();
      return user;
    }catch(err){
      console.log('Cant create an user');
    }
    return null;
  }

  static async findAll(){
    try{
      const client = await pool.connect();
      const { rows: user } = await client.query(
        'SELECT * FROM user'
      );
      await client.release();
      return user;
    }catch(err){
      console.log('Cant find all users');
    }
    return null;
  }

  static async findById(user_id: string){
    try{
      const client = await pool.connect();
      const { rows: user } = await client.query(
        'SELECT * FROM user U where U.id = $1',
        [user_id]
      );
      await client.release();
      return user;
    }catch(err){
      console.log('Cant find an user');
    }
    return null;
  }

  static async update(data: IUser, user_id: string){
    try{
      const client = await pool.connect();
      const {
        username,
        email,
        password
      } = data;
      const { rows: user } = await client.query(
        'UPDATE user U SET name = $1, email = $2, password = $3 WHERE U.id = $4',
        [username, email, password, user_id]
      );
      await client.release();
      return user;
    }catch(err){
      console.log('Cant update an user');
    }
    return null;
  }

  static async findByIdAndDelete(user_id: string){
    try{
      const client = await pool.connect();
      const { rows: user } = await client.query(
        'DELETE FROM user U where U.id = $1',
        [user_id]
      );
      await client.release();
      return user;
    }catch(err){
      console.log('Cant delete an user');
    }
    return null;
  }
}

export default User;
