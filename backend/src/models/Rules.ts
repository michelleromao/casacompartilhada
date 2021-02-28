import pool from "../database/index";

interface IRules{
  description: string;
  creator_id: string;
  home_id: string;
}

class Rules{
  static async create(data: IRules){
    try{
      const client = await pool.connect();
      const {
        description,
        creator_id,
        home_id,
      } = data;
      const { rows: rules } = await client.query(
        'INSERT INTO rules (description, creator_id, home_id) values ($1, $2, $3) RETURNING *',
        [description, creator_id, home_id]
      );
      await client.release();
      return rules;
    }catch(err){
      console.log('Cant create a rule');
    }
    return null;
  }

  static async findAll(){
    try{
      const client = await pool.connect();
      const { rows: rules } = await client.query(
        'SELECT * FROM rules'
      );
      await client.release();
      return rules;

    }catch(err){
      console.log('Cant find all rules');
    }
    return null;
  }

  static async findById(rule_id: string){
    try{
      const client = await pool.connect();
      const { rows: rules } = await client.query(
        'SELECT * FROM rules R where R.id = $1',
        [rule_id]
      );
      await client.release();
      return rules;
    }catch(err){
      console.log('Cant find a rule');
    }
    return null;
  }

  static async findByHomeId(home_id: string){
    try{
      const client = await pool.connect();
      const { rows: rule } = await client.query(
        'SELECT * FROM rules R where R.home_id = $1',
        [home_id]
      );
      await client.release();
      return rule;
    }catch(err){
      console.log('Cant find a rule');
    }
    return null;
  }

  static async update(data: IRules, rule_id: string, creator_id: string){
    try{
      const client = await pool.connect();
      const {
        description
      } = data;
      const { rows: rule } = await client.query(
        'UPDATE rules R SET description = $1 WHERE R.id = $2 AND R.creator_id = $3',
        [description, rule_id, creator_id]
      );
      await client.release();
      return rule;
    }catch(err){
      console.log('Cant update a rule');
    }
    return null;
  }

  static async findByIdAndDelete(rule_id: string, creator_id: string){
    try{
      const client = await pool.connect();
      const { rows: rule } = await client.query(
        'DELETE FROM rules R where R.id = $1 AND R.creator_id = $2',
        [rule_id, creator_id]
      );
      await client.release();
      return rule;
    }catch(err){
      console.log('Cant delete a rule');
    }
    return null;
  }
}

export default Rules;