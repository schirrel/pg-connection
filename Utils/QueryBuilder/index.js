
const config = require('../../Database/Config');

class QueryBuilder {
	static insert(tableName, params) {
		let values = ' VALUES (';
		
		let myQuery = `insert into ${config.schema}.${tableName}  (`;
		let keys = Object.keys(params);

		for (let i = 0; i < keys.length; i++) {
			myQuery += '' + keys[i] + (i < keys.length - 1 ? ',' : ')');
			values += ' $' + (i + 1) + (i < keys.length - 1 ? ',' : ')');
		}
		let arrayValues = Object.keys(params).map(function (key) {
			return params[key];
		});
		myQuery = myQuery.concat(values);
		myQuery = myQuery.concat('RETURNING *');

		return {
			query: myQuery,
			values: arrayValues
		};
	}
	static update(tableName, params) {
		let myQuery = `UPDATE ${config.schema}.${tableName}  SET`;
		let keys = Object.keys(params).filter(k => k != 'id');
		let vals = [];
		for (let i = 0; i < keys.length; i++) {
			if (keys[i] != 'id') {
				myQuery += '' + (keys[i] + " = " + ' $' + (i + 1)) + (i < keys.length - 1 ? ',' : '');
				vals.push(params[keys[i]])
			}
		}

		myQuery += " where id = $" + (vals.length + 1);
		
		myQuery = myQuery.concat('RETURNING *');
		vals.push(params.id)

		return {
			query: myQuery,
			values: vals
		};
	}
	static search(table, options) {
		let myQuery = `SELECT *  FROM ${config.schema}.${table.tableName}  where`;
		let keys = Object.keys(options);
		let vals = [];


		for (let i = 0; i < keys.length; i++) {
			let key = options;
			myQuery += '' + (table.getColumn(key)) + " = " + ' $' + (i + 1) + (i < keys.length - 1 ? ',' : '');
			vals.push(options[key]);
		}

		return {
			query: myQuery,
			values: vals
		};


	}
	static delete(table, id) {

		return { query: `DELETE FROM ${config.schema}.${table.tableName} where ${table.getColumn('id')}  =  $1`, vals: [id] };
	}
	static get(table, id) {

		return { query: `SELECT * FROM ${config.schema}.${table.tableName} where ${table.getColumn('id')}  =  $1`, vals: [id] };
	}
	static list(tableName) {

		return { query: `SELECT * FROM ${config.schema}.${tableName}`, vals: [] };
	}

}
module.exports = QueryBuilder;