exports.up = function(knex) {
    return knex.schema.createTable('ongs', function(table) {
        table.string('id').primary(); 
        table.string('name').notNullable();    // notNullable Quer dizer que não pode fica sem nada
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable(); // 'uf, 2 Quer dizer que so pode ser 2 valores ali dentro
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('ongs');  // Precisa ser apagada...
};
