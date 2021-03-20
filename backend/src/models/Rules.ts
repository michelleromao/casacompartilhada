import pool from "../database/index";
import { format } from 'date-fns-tz';

interface IRules{
  description: string;
  creator_id?: string;
  home_id?: string;
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
  }

  static async update(data: IRules, rule_id: string, creator_id: string){
    try{
      const client = await pool.connect();
      const {
        description
      } = data;

      const now: string = format((new Date()), 'yyyy-MM-dd HH:mm:SS.sssss');
      const { rows: rule } = await client.query(
        'UPDATE rules R SET description = $1, updated_at = $2 WHERE R.id = $3 AND R.creator_id = $4 RETURNING *',
        [description, now, rule_id, creator_id]
      );
      await client.release();
      return rule;
    }catch(err){
      console.log('Cant update a rule');
    }
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
  }
}

export default Rules;
