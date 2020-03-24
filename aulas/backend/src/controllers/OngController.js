const crypto = require('crypto')    // Existe um metodo que retorna varios caracteros aleatorios.
const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },


    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;

        const id = crypto.randomBytes(4).toString('HEX')
            // Ele vai gerar 4 bytes de caracteres aleatorios e converter ele em string hex decimal.

        await connection('ongs').insert({    
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
    })
    

    return response.json({ id });
  }  
};