/**
 TODO Utilizar https: //www.npmjs.com/package/js-hibernate
 **/
let connection = false;
module.exports = (() => {
    const config = require('./Config');
    const {
        Pool
    } = require('pg');
    const options = {
        user: process.env.DB_USER,
        host: process.env.DB_URL,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        port: 5432,
        ssl: true
    };
    const pool = new Pool(config.options);

  pool.on('connect', () => {
        config.init();
        console.log('Database connected');
    });

    const wrapper = (query, params = []) => pool.query(query, params);


  const connect = async () => {
        let client = await pool
            .connect();

        if (client) {
            createTables();
            console.log('Database connected');
        }

    };
    return {
        connect: connect
        query: wrapper
    }
})();
