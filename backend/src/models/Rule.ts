import pool from "../database/index";

interface IRule{
  description: string
}

class Rule{
  static async create(data: IRule){
    try{
      const client = await pool.connect();
      const {
        description
      } = data;
      const { rows: rule } = await client.query(
        'INSERT INTO rule (description) values ($1) RETURNING *',
        [description]
      );
      await client.release();
      return rule;
    }catch(err){
      console.log('Cant create a rule');
    }
    return null;
  }

  static async findAll(){
    try{
      const client = await pool.connect();
      const { rows: rules } = await client.query(
        'SELECT * FROM rule'
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
      const { rows: rule } = await client.query(
        'SELECT * FROM rule R where R.id = $1',
        [rule_id]
      );
      await client.release();
      return rule;
    }catch(err){
      console.log('Cant find a rule');
    }
    return null;
  }

  static async update(data: IRule, rule_id: string){
    try{
      const client = await pool.connect();
      const {
        description
      } = data;
      const { rows: rule } = await client.query(
        'UPDATE rule R SET description = $1 WHERE R.id = $2',
        [description, rule_id]
      );
      await client.release();
      return rule;
    }catch(err){
      console.log('Cant update a rule');
    }
    return null;
  }

  static async findByIdAndDelete(rule_id: string){
    try{
      const client = await pool.connect();
      const { rows: rule } = await client.query(
        'DELETE FROM rule R where R.id = $1',
        [rule_id]
      );
      await client.release();
      return rule;
    }catch(err){
      console.log('Cant delete a rule');
    }
    return null;
  }
}

export default Rule;
