const Database = require('../Database');
const Model = require('../Model');
const QueryBuilder = require('../Utils/QueryBuilder');
const Logger = require('../Utils/Logger');

class Repository {
  
  constructor(_table) {
	  if(! _table instanceof Model) {
		  throw Error('Table muste be a instance of Model');
	  }
	this.table = _table;
	this.tableName = new _table().tableName;
  }
  
  
  
  async persist(persistObject){	
		try {
		const res = await Database.query(persistObject.query, persistObject.values);
			return res;
		} catch(err) {  
			Logger.error(err);
			err.erro = 'ERRO';
			return err;
		}
	}

	async get(id) {
		const res = await Database.query(QueryBuilder.get(this.tableName), [id]);
		let response = await res.rows[0];
		let model = new this.table();
		model.setValues(response || {}, true)
		return model;
	}
	convert(model) {
		if(model instanceof this.table) {
			return model;
		} else {
			
		var _model = new this.table();
		_model.setValues(model);
		return _model;
			
		}
	}
	async create(model) 
	{
		return await this._create(this.convert(model));
	}
	async update(model) {
		return await this._update(this.convert(model));
	}

	async _create(model) 
	{
		let obj = model.createPersistObject()
		let toPersist = QueryBuilder.insert(this.tableName, obj);
		return await this.persist(toPersist);
	}
	async _update(model) {
		let obj = model.createUpdateObject()
		let toPersist = QueryBuilder.update(this.tableName, obj);
		return await this.persist(toPersist);
	}
	async delete(id) {	
		const res = await Database.query(QueryBuilder.delete(this.tableName), [id]);
		let response = await res.rows[0];
		return this._setValues(response || {});
	}

	async list() 
	{
		const res = await Database.query(`SELECT * FROM ${this.tableName}`, []);
		let response = await res.rows;
        return response ;
		
	}
	async search (options) {
		const params = QueryBuilder.search(new this.table(), options);
		const res = await Database.query(params.query, params.values);
		let response = await res.rows;
		//TODO APPLY CONVERTION FROM DATABASE TO MODEL
        return response ;
	}
	async paginate(options) 
	{
			//TODO
	}
  
}


module.exports = Repository;
