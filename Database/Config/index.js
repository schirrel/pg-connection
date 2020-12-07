
module.exports = (() => {
    const dotenv = require('dotenv');
    dotenv.config();
    const config = {
        options :{            
        user: process.env.PG_USER,
        host: process.env.PG_URL,
        database: process.env.PG_DATABASE,
        password: process.env.PG_PASSWORD,
        port: process.env.PG_PORT || 5432,
        ssl: process.env.PG_SSL == 'true'
        },
        log: process.env.PG_LOG == 'true'
    };
    return config;
})();
