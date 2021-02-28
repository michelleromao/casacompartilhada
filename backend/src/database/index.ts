import dbConfig from "../config/database";
import { Pool } from 'pg';

const pool = new Pool(dbConfig);

const bill_status_paid = `
CREATE OR REPLACE FUNCTION bill_status_paid(uuid)
  RETURNS void AS $function$
  DECLARE
    home_status BOOLEAN;
    home_id_var uuid;
    count_home INTEGER;
    count_pay INTEGER;
  BEGIN
    home_status := (SELECT home FROM bills B WHERE B.id = $1);
    home_id_var := (SELECT home_id FROM bills B WHERE B.id = $1);
    IF(home_status = TRUE) THEN
      count_home := (SELECT count(home_id) from users U where U.home_id = home_id_var);
      count_pay := (SELECT count(payer_id) from payments P where P.bill_id = $1);
      IF(count_home = count_pay) THEN
        UPDATE bills B SET status = true WHERE B.id = $1;
      END IF;
    ELSE
      count_pay := (SELECT count(payer_id) from payments P where P.bill_id = $1);
      IF(count_pay = 1) THEN
        UPDATE bills B SET status = true WHERE B.id = $1;
      END IF;
    END IF;
  END;
  $function$ LANGUAGE plpgsql;
`;

pool.connect((err, client, done) =>{
  if(err) throw err;
  client.query(bill_status_paid, (err, res) =>{
    done();
    if(err){
      console.log(err.stack)
    }else{
      console.log('bill_status_paid is running');
    }
  })
})

pool.query('SELECT NOW()', (err, res) => {
  console.log(res.rows)
  pool.end()
})

export default pool;
