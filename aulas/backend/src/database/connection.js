const knex = require('knex');
const configuration = require('../../knexfile'); //Configurações dentro do knexfile.

const connection = knex(configuration.development);
    // Fazendo a conexão em mode de desenvolvetor

module.exports = connection;