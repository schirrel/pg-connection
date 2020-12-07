module.exports = (() => {
    const config = require('./Config');
    const {
        Pool
    } = require('pg');

  
    const pool = new Pool(config.options);

  pool.on('connect', () => {
        config.init();
        if(config.log)
        console.log('Database connected');
    });

    const query = (query, params = []) => pool.query(query, params);


  const connect = async () => {
        let client = await pool
            .connect();

        if (client) {
            if(config.log)
            console.log('Database connected');
        }

    };
    return {
        connect: connect,
        query: query
    }
})();
