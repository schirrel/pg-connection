
module.exports = (() => {
    const dotenv = require('dotenv');
    const logger = require('../utils/logger');
  
    const options = {
        user: process.env.DB_USER,
        host: process.env.DB_URL,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        port: 5432,
        ssl: true
    };
  
    const createTables = (client) => {
    }
    return {
       options, createTables
    }
})();
