const request = require('supertest');
const app = require('../../app');
const connection = require('../../database/connection')

describe('ONG', () => {
    beforeEach(async() =>{
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('shoud be able to create a new ONG', async () => {
        const response = await request(app).post('/ongs').send({
            // para setar header use o set()
            name : "absc22",
            email : "abc@ert.com",
            whatsapp : "16000000000",
            city : "Ribeirao preto",
            uf : "SP"

        });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });

});