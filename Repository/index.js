const Database = require("../Database");
const Model = require("../Model");
const QueryBuilder = require("../Utils/QueryBuilder");
const Logger = require("../Utils/Logger");

class Repository {
  constructor(_table) {
    if (!_table instanceof Model) {
      throw Error("Table muste be a instance of Model");
    }
    this.table = _table;
    this.tableName = new _table().tableName;
  }

  async persist(persistObject) {
    try {
      const res = await Database.query(
        persistObject.query,
        persistObject.values
      );
      return res.rowCount == 1 ? res.rows[0] : res;
    } catch (err) {
      Logger.error(err);
      err.erro = "ERRO";
      return err;
    }
  }

  async get(id) {
    let query = QueryBuilder.get(new this.table({ id: id }));
    const res = await Database.query(query.query, query.vals);
    let response = await res.rows[0];
    let model = new this.table();
    model.setValues(response || {}, true);
    return model;
  }

  async delete(id) {
    let query = QueryBuilder.delete(new this.table({ id: id }));
    const res = await Database.query(query.query, query.vals);
    let deleted = await res.rowCount;
    return deleted;
  }
  convert(model) {
    if (model instanceof this.table) {
      return model;
    } else {
      var _model = new this.table();
      _model.setValues(model);
      return _model;
    }
  }
  async create(model) {
    return await this._create(this.convert(model));
  }
  async update(model) {
    return await this._update(this.convert(model));
  }

  async _create(model) {
    try {
      let obj = model.createPersistObject();
      let toPersist = QueryBuilder.insert(this.tableName, obj, model.primaryKey);
      return await this.persist(toPersist);
    } catch (err) {
      Logger.error(err);
      err.erro = "ERRO";
      return err;
    }
  }
  async _update(model) {
    try {
      let obj = model.createUpdateObject();
      let toPersist = QueryBuilder.update(this.tableName, obj);
      return await this.persist(toPersist);
    } catch (err) {
      Logger.error(err);
      err.erro = "ERRO";
      return err;
    }
  }

  async list() {
    try {
      const res = await this.search({}, {});
      return response;
    } catch (err) {
      Logger.error(err);
      err.erro = "ERRO";
      return err;
    }
  }
  async search(properties = {}, options = {}) {
    try {
      const params = QueryBuilder.search(new this.table(), properties, options);
      const res = await Database.query(params.query, params.values);
      let response = await res.rows;
      let result = response.map((row) => new this.table(row, true));
      return result;
    } catch (err) {
      Logger.error(err);
      err.erro = "ERRO";
      return err;
    }
  }
  async paginate(properties) {
    let pageParams = {
      page: properties.page || 1,
      size: properties.size || 10,
    };
    delete properties.page;
    delete properties.size;

    let options = {
      query: ` LIMIT ${pageParams.size} OFFSET ${
        pageParams.size * (pageParams.page - 1)
      }`,
      values: [],
    };

    return this.search(properties, options);
  }
}

module.exports = Repository;
