const Database = require('../Database/Connection');
const queryBuilder = require('../Database/Utils').queryBuilder;

class Base {
	constructor(tableName){
	this.id = null; 
	this._tableName = tableName;
	this._db = Database.getConnection();
	this._columns = {id: 'ID'};
	}

	
	_setValues(vals) {
		for(key of vals){
			this._colunas[key] = vals[key];
		}
	}

	_addColumn(property, column){
		this._columns[property] = column;
	}

	_getColumn(property) {
		return this._columns[property];
	}

	getColumn(property) {
		return this._columns[property];
	}
	_persistObject () {
		let obj = {};

		for(var col in this._columns) {
			obj[this._columns[col]] = this[col];
		}
		if(obj[this._columns.id]===null){
			delete obj[this._columns.id];
		}
		return obj;
	}

	async _persist(persistObject){	
		try {
		const res = await this._db.query(persistObject.query, persistObject.values);
			return res;
		} catch(err) {  
			this.logger.error(err);
			err.erro = 'ERRO';
			return err;
		}
	}

	async get(id) {
		const res = await this._db.query(`SELECT * FROM ${this._tableName} where ${this._columns.id} = $1`, []);
		let response = await res.rows[0];
        return response || {};
	}
	async save() 
	{
		let obj = this.persistObject()
		let toPersist = queryBuilder.insert(this._tableName, obj);
		return await this.persist(toPersist);
	}
	async update() {
		let obj = this.persistObject()
		let toPersist = queryBuilder.update(this._tableName, obj);
		return await this.persist(toPersist);
	}

	static async deleteById(id) {
		let query =  `DELETE ${this._tableName} where ${this._columns.id} = $1`
		const res = await this._db.query(query, [id]);
        let response = await res.rows[0];
        return response || {};
	}
	async delete() {	
        return await this.deleteById(this.id);
	}

	static async list() 
	{
		const res = await this._db.query(`SELECT * FROM ${this._tableName}`, []);
		let response = await res.rows;
        return response ;
		
	}
	static async search (options) {
		const params = queryBuilder.search(new this(), options);
		const res = await this._db.query(params.query, params.values);
		let response = await res.rows;
        return response ;
	}
	static async paginate(options) 
	{
			//TODO
	}
}
module.exports = Base;
