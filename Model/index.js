
class Model {
	constructor(tableName){
	this.id = null; 
	this.tableName = tableName;
	this._columnsInverse = {ID:'id'}
	this._columns = {id: 'ID'};
	this._defaults = {  };
	}	

	getColumn(property) {
		return this._columns[property];
	}
	
	setValues(vals, fromDatabase) {
		if(fromDatabase){
			for(let key in vals){
				if(this._columnsInverse[key]) {
					this[key] = vals[key];
				}	
			}
		} else {
			for(let key in vals){
				if(this._columns[key] !== "undefined") {
					this[key] = vals[key];
				}	
			}
		}

		for(let defs in this._defaults){
			if((typeof this[defs] === "undefined")) {
				this[defs] = this._defaults[defs];
			}	
		}
		
	}

	addColumn(property, column, defaultVal) {
		this._columns[property] = column;
		this._columnsInverse[column] = property;
		if((typeof defaultVal !== "undefined")) this._defaults[property] = defaultVal;
	}

	getColumn(property) {
		return this._columns[property];
	}
	
	
	createUpdateObject() {
		let obj = {};

		//Get all value and set it in a Column name variables
		for (var col in this._columns) {
			if(!(typeof this[col] === "undefined" )) {
				obj[this._columns[col]] = this[col];
			}
		}
		return obj;
	}
	
	createPersistObject() {
		let obj = {};

		for (var col in this._columns) {
			obj[this._columns[col]] = this[col];
		}
		if (obj[this._columns.id] === null) {
			delete obj[this._columns.id];
		}
		return obj;
	}
}
module.exports = Model;
