import pool from "../database/index";

interface IPurchaseItem {
  item: string;
  status: boolean;

}

class PurchaseItem{
  static async create(data: IPurchaseItem){
    try{
      const client = await pool.connect();
      const {
        item
      } = data
      const { rows: purchaseitem } = await client.query(
        'INSERT INTO purchase_item (item, status) values ($1, $2) RETURNING *',
        [item, false]
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
        'SELECT * FROM purchase_item'
      );
      await client.release();
      return purchaseitem;

    }catch(err){
      console.log('Cant find all purchase items');
    }
    return null;
  }

  static async findById(purchase_item_id: string){
    try{
      const client = await pool.connect();
      const { rows: purchaseitem } = await client.query(
        'SELECT * FROM purchase_item P where P.id = $1',
        [purchase_item_id]
      );
      await client.release();
      return purchaseitem;
    }catch(err){
      console.log('Cant find a purchase item');
    }
    return null;
  }

  static async update(data: IPurchaseItem, purchase_item_id: string){
    try{
      const client = await pool.connect();
      const {
        item,
        status
      } = data;
      const { rows: purchaseitem } = await client.query(
        'UPDATE purchase_item P SET item = $1, status = $2 WHERE P.id = $3',
        [item, status, purchase_item_id]
      );
      await client.release();
      return purchaseitem;
    }catch(err){
      console.log('Cant update a purchase item');
    }
    return null;
  }

  static async findByIdAndDelete(purchase_item_id: string){
    try{
      const client = await pool.connect();
      const { rows: purchaseitem } = await client.query(
        'DELETE FROM purchase_item P where P.id = $1',
        [purchase_item_id]
      );
      await client.release();
      return purchaseitem;
    }catch(err){
      console.log('Cant delete a purchase item');
    }
    return null;
  }
}

export default PurchaseItem;
