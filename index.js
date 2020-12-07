const database = require('./Database/Connection');

module.exports = (() => {
  database.connect();
})();
