import dbConfig from "../config/database";
import { Pool } from 'pg';

const pool = new Pool(dbConfig);

pool.query('SELECT NOW()', (err, res) => {
  console.log(res.rows)
  pool.end()
})

export default pool;
