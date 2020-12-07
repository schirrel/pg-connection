
module.exports = (() => {
    const dotenv = require('dotenv');
    dotenv.config();
    const config = {
        options :{            
        user: process.env.PG.USER,
        host: process.env.PG.URL,
        database: process.env.PG.DATABASE,
        password: process.env.PG.PASSWORD,
        port: 5432,
        ssl: true
        },
        log: process.env.PG.LOG == 'true'
    };
    return config;
})();
