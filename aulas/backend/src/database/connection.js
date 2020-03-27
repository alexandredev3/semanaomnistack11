const knex = require('knex');
const configuration = require('../../knexfile'); //Configurações dentro do knexfile.

const config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development;

const connection = knex(config);
    // Fazendo a conexão em mode de desenvolvetor

module.exports = connection;