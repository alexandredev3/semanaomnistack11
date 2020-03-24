const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const ong_id = request.headers.authorization;    // <--

        const incidents = await connection('incidents')
            .where('ong_id', ong_id) // Estou buscando todos os incidentes qua foi <-- ong que criou
            .select('*'); // Vou buscar todos os campos dessa ONG.

        return response.json(incidents);
    }
}