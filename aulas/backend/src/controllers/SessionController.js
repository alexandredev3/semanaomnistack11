const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { id } = request.body;

        const ong = await connection('ongs')
            .where('id', id)
            .select('name') // So precisamos do nome, para mostrar no backend.
            .first();   // Como e um id ele so vai retorna um id.

        if (!ong) {
            return response.status(400).json({ error: 'No ONG found witht this ID' });
            // Se não for encontrado esse id ele vai cair no erro 400.
            // 400 = bad request.
        }

        return response.json(ong);
        // Se tudo ter certo ele vai retornar os dados da minha ONG.(apenas o nome dela.)
    }
}