// TESTES DE FUNCIONALIDADES DA ONG

const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();  // Ele vai desfazer a migration anterior, para não deixar o banco de dados muito grande.
        await connection.migrate.latest();   // Precisamos executar as migrations para fazer os testes funcionar...
    });    // Antes de cada um dos testes.

    afterAll(async () => {
        await connection.destroy(); // Ele vai destruir a conexão do banco de dados.(que deu aquele erro.)
    }); // Para excutar tudo depois dos testes. (para tirar aquele erro quando termina os testes)

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
        .post('/ongs')  // Fazendo a requesição no metodo post.
        //.set('Authorization', 'id valito de uma ONG') Se vc for testar um header
        .send({
            name: "APAD2",
            email: "contato@gmail.com",
            whatsapp: "6100000000",
            city: "Rio do sul",
            uf: "SC"
        })  // Qual dados quero que seja enviados.

        expect(response.body).toHaveProperty('id'); // Eu espero que dentro do reponse.body tenha uma propriedade id
        expect(response.body.id).toHaveLength(8);  // Eu espero que o id tenha 8 caracteres.
    });
});