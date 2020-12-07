
module.exports = (() => {
    const dotenv = require('dotenv');
    dotenv.config();
    const config = {
        options :{            
        user: process.env.PG_USER,
        host: process.env.PG_URL,
        database: process.env.PG_DATABASE,
        password: process.env.PG_PASSWORD,
        port: 5432,
        ssl: true
        },
        log: process.env.PG.LOG == 'true'
    };
    return config;
})();
