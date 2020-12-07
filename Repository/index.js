
const Database = require('../Database/Connection');

class Repository {
  
  constructor(_table) {
	this.table = _table;
  }
  
  
  
  async persist(persistObject){	
		try {
		const res = await Database.query(persistObject.query, persistObject.values);
			return res;
		} catch(err) {  
			this.logger.error(err);
			err.erro = 'ERRO';
			return err;
		}
	}

	async get(id) {
		const res = await Database.query(queryBuilder.get(this.table.tableName), [id]);
		let response = await res.rows[0];
		let model = new this.table();
		model.setValues(response || {}, true)
		return model;
	}
	async save(model) 
	{
		let obj = model.createPersistObject()
		let toPersist = queryBuilder.insert(this.table.tableName, obj);
		return await this.persist(toPersist);
	}
	async update(model) {
		let obj = model.createUpdateObject()
		let toPersist = queryBuilder.update(this.table.tableName, obj);
		return await this.persist(toPersist);
	}

	async delete(model) {	
		const res = await Database.query(queryBuilder.delete(this.table.tableName), [model.id]);
		let response = await res.rows[0];
		return this._setValues(response || {});
	}

	static async list() 
	{
		const res = await Database.query(`SELECT * FROM ${this.table.tableName}`, []);
		let response = await res.rows;
        return response ;
		
	}
	static async search (options) {
		const params = queryBuilder.search(new this.table(), options);
		const res = await Database.query(params.query, params.values);
		let response = await res.rows;
		//TODO APPLY CONVERTION FROM DATABASE TO MODEL
        return response ;
	}
	static async paginate(options) 
	{
			//TODO
	}
  
}


module.exports = Repository;
