// TESTE NA ROUTA PROFILE.

const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('CREATE', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('should to able create a new incident', async () => {
        const response = await request(app)
        .post('/incidents')
        .set('Authorization', '696eb438')
        .send({
            title: "Caso teste",
            description: "Dog atropelado",
            value: 430
        });
        
        expect(response.body).toHaveProperty('id');
    })
});