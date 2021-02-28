import pool from "../database/index";

interface IPurchaseItems {
  item: string;
  status?: boolean;
  creator_id?: string;
  home_id?: string;
  buyer_id?: string;
}

class PurchaseItems{
  static async create(data: IPurchaseItems){
    try{
      const client = await pool.connect();
      const {
        item,
        creator_id,
        home_id,
      } = data
      const { rows: purchaseitem } = await client.query(
        'INSERT INTO purchase_items (item, status, creator_id, home_id) values ($1, $2, $3, $4) RETURNING *',
        [item, false, creator_id, home_id]
      );
      await client.release();
      return purchaseitem;
    }catch(err){
      console.log('Cant create a purchase item');
    }
  }

  static async findAll(){
    try{
      const client = await pool.connect();
      const { rows: purchaseitem } = await client.query(
        'SELECT * FROM purchase_items'
      );
      await client.release();
      return purchaseitem;

    }catch(err){
      console.log('Cant find all purchase items');
    }
  }

  static async findById(purchase_item_id: string){
    try{
      const client = await pool.connect();
      const { rows: purchaseitem } = await client.query(
        'SELECT * FROM purchase_items P where P.id = $1',
        [purchase_item_id]
      );
      await client.release();
      return purchaseitem;
    }catch(err){
      console.log('Cant find a purchase item');
    }
  }

  static async findByHomeId(home_id: string){
    try{
      const client = await pool.connect();
      const { rows: purchaseitem } = await client.query(
        'SELECT * FROM purchase_items P where P.home_id = $1',
        [home_id]
      );
      await client.release();
      return purchaseitem;
    }catch(err){
      console.log('Cant find a purchase item');
    }
  }

  static async findByStatus(status: string, home_id: string){
    try{
      const client = await pool.connect();
      const { rows: purchaseitem } = await client.query(
        'SELECT * FROM purchase_items P where P.status = $1 AND P.home_id = $2',
        [status, home_id]
      );
      await client.release();
      return purchaseitem;
    }catch(err){
      console.log('Cant find a purchase item');
    }
  }

  static async update(data: IPurchaseItems, purchase_item_id: string, creator_id: string){
    try{
      const client = await pool.connect();
      const {
        item,
        status
      } = data;
      const { rows: purchaseitem } = await client.query(
        'UPDATE purchase_items P SET item = $1, status = $2 WHERE P.id = $3 AND P.creator_id = $4 RETURNING *',
        [item, status, purchase_item_id, creator_id]
      );
      await client.release();
      return purchaseitem;
    }catch(err){
      console.log('Cant update a purchase item');
    }
  }

  static async findByIdAndDelete(purchase_item_id: string, creator_id: string){
    try{
      const client = await pool.connect();
      const { rows: purchaseitem } = await client.query(
        'DELETE FROM purchase_items P where P.id = $1 AND P.creator_id = $2',
        [purchase_item_id, creator_id]
      );
      await client.release();
      return purchaseitem;
    }catch(err){
      console.log('Cant delete a purchase item');
    }
  }
}

export default PurchaseItems;
