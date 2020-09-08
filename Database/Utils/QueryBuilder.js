module.exports = (() => {

	const insert = (tableName, params) => {
		let values = ' VALUES (';
		let myQuery = 'insert into ' + tableName + " (";
		let keys = Object.keys(params);

		for (let i = 0; i < keys.length; i++) {
			myQuery += '' + keys[i] + (i < keys.length - 1 ? ',' : ')');
			values += ' $' + (i + 1) + (i < keys.length - 1 ? ',' : ')');
		}
		let arrayValues = Object.keys(params).map(function (key) {
			return params[key];
		});
		myQuery = myQuery.concat(values);

		return {
			query: myQuery,
			values: arrayValues
		};
	}

	const update = (tableName, params) => {
		let myQuery = 'UPDATE ' + tableName + " SET ";
		let keys = Object.keys(params).filter(k => k != 'id');
		let vals = [];
		for (let i = 0; i < keys.length; i++) {
			if (keys[i] != 'id') {
				myQuery += '' + (keys[i] + " = " + ' $' + (i + 1)) + (i < keys.length - 1 ? ',' : '');
				vals.push(params[keys[i]])
			}
		}

		myQuery += " where id = $" + (vals.length + 1);
		vals.push(params.id)

		return {
			query: myQuery,
			values: vals
		};
	}

	const search  = (table, options) => {
		let myQuery = `SELECT *  FROM ${table.tableName} where `;
		let keys = Object.keys(options);
		let vals = [];
		

		for (let i = 0; i < keys.length; i++) { 
			let key = options;
			myQuery += '' + (table.getColumn(key))+ " = " + ' $' + (i + 1) + (i < keys.length - 1 ? ',' : '');
			vals.push(options[key]);		
		}

		return {
			query: myQuery,
			values: vals
		};


	}


	return {
		insert, update, search
	};
})();
