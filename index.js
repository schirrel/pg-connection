const database = require('./Database');

module.exports = (() => {
  database.connect();
})();
