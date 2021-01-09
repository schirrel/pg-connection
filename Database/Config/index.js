
module.exports = (() => {
    const dotenv = require('dotenv');
    dotenv.config();
    const config = {
        options: {
            user: process.env.PG_USER,
            host: process.env.PG_URL,
            database: process.env.PG_DATABASE,
            password: process.env.PG_PASSWORD,
            port: process.env.PG_PORT || 5432,
            ssl: false
        },
        schema: process.env.PG_SCHEMA,
        log: process.env.PG_LOG == 'true'
    };
    if (process.env.PG_SSL == 'true') {
        config.options.ssl = true;
    }
    if (process.env.PG_REJECT_UNHAUTHORIZED == "false") {
        config.options.ssl = { rejectUnauthorized: false };
    }

    return config;
})();
