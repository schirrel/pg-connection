class Model {
  constructor(tableName, primaryColumn = { id: "ID" }) {
    this.id = null;
    this.tableName = tableName;
    this._columnsInverse = {};
    this._columns = {}
    this._primaryColumn = "ID";
    this._defaults = {};
    this.addColumn(Object.keys(primaryColumn)[0], Object.values(primaryColumn)[0], null, true);
  }

  toJSON() {
    let obj = { id: this.id };
    for (var col in this._columns) {
      let value = this[col];
      if (!(typeof value === "undefined")) {
        obj[col] = value;
      }
    }
    return obj;
  }

  setValues(vals, fromDatabase) {
    if (fromDatabase) {
      for (let key in vals) {
        if (this._columnsInverse[key]) {
          this[this._columnsInverse[key]] = vals[key];
        }
      }
    } else {
      for (let key in vals) {
        if (this._columns[key] !== "undefined") {
          this[key] = vals[key];
        }
      }
    }

    for (let defs in this._defaults) {
      if (typeof this[defs] === "undefined") {
        this[defs] = this._defaults[defs];
      }
    }
    return this;
  }

  addColumn(property, column, defaultVal, primary) {
    let _prop = property;
    let _col = column || property;
    this._columns[_prop] = _col;
    this._columnsInverse[_col] = _prop;
    if (typeof defaultVal !== "undefined") this._defaults[_prop] = defaultVal;
    if (primary) {
      this._primaryColumn = column;
    }
    return this;
  }

  getColumn(property) {
    return this._columns[property];
  }

  get primaryKey() {
    return this._primaryColumn;
  }
  get primaryKeyValue() {
    return this[this._primaryColumn];
  }


  createUpdateObject() {
    let obj = {};

    //Get all value and set it in a Column name variables
    for (var col in this._columns) {
      if (!(typeof this[col] === "undefined")) {
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

  setPrimaryKeyValue(value) {
    this[this._primaryColumn] = value;
  }
}
module.exports = Model;
