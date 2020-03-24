exports.up = function(knex) {
        return knex.schema.createTable('incidents', function(table) {
            // Chave primaria
            table.increments(); 

            // Campos da tabela.
            table.string('title').notNullable();    // notNullable Quer dizer que não pode fica sem nada
            table.string('description').notNullable();
            table.decimal('value').notNullable();   // Decimal == Float (Pode ter casas decimais)
    
            // Coluna para amazenar qual ong criou o incidente. (Relacionamento)
            table.string('ong_id').notNullable();

            // Chave extrageira
            table.foreign('ong_id').references('id').inTable('ongs') // A ong_id referencia a coluna id dentro da tabela ongs
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('incidents')
};
