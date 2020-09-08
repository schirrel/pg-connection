
module.exports = (() => {
    const dotenv = require('dotenv');
  
    const options = {
        user: process.env.DB_USER,
        host: process.env.DB_URL,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        port: 5432,
        ssl: true
    };
  
    const init = (client) => {
    }
    return {
       options, createTables
    }
})();
