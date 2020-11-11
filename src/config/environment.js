require('dotenv').config();

const environment = {
  API: {
    HOST: process.env.BASE_URL || 'localhost',
    PORT: process.env.PORT || 3000
  }
}

module.exports = environment;
