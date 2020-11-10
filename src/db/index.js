const { sequelize } = require('../app/models');
const config = require('../config/environment').DB;

sequelize.authenticate()
    .then(function () {
        console.log(`Conectado ao banco de dados em *${config.host}*`);
    })
    .catch(function (err) {
        console.error(`Problema de conexão com o banco de dados em *${config.host}*. \n Erro: ${err}`);
    })
