require('dotenv').config();

database = {
    host: process.env.DB_HOST || 'localhost',
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'rootroot',
    database: process.env.DB_NAME || 'coligio',
    dialect: process.env.DB_DIALECT || 'mysql',
    options: {
      dialect: process.env.DB_DIALECT || 'mysql',
      host: process.env.DB_HOST || 'localhost',
    }

}

module.exports = database;
