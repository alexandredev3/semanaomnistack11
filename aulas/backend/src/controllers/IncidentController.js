const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;
        // O valor por padrão vai ser a pagina 1

        const [cout] = await connection('incidents').count(); // Ele vai contar o total de acidentes.

        // console.log(cout);

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')   // Quando nós queremos relacionar dados de 2 tabelas.
            .limit(5)   // Ele vai limiar para 5 incidents.
            .offset((page - 1) * 5) 
            .select('incidents.*', 
            'ongs.name', 
            'ongs.email', 
            'ongs.whatsapp', 
            'ongs.city', 
            'ongs.uf');
            // incidents.* E para escolhar quais informações que eu quero que apareça da ong.

        response.header('X-Total-Cout', cout['count(*)']);

        return response.json(incidents);
    },

    async create(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization; // Estamos pegando o id da ong.

        const [id] = await connection('incidents').insert({   // O const [id], vai retorna um unico id com uma posição
            title,
            description,
            value,
            ong_id,
        })

        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;
        // Para ver se a ong realmente quer deletar(Para outras ongs não deletar)

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id') // Apenas a ong não e preciso de todas as outras colunas.
            .first();  // Como eu sei que ele so vai me retorna um resultado e so colocar o first.

        if (incident.ong_id != ong_id) { // Se o incident.ong_id for diferente de ong_id ele vai mudar o status para 401 que significa um erro.
            return response.status(401).json({ error: 'Operation not permitted.' });
        }

        await connection('incidents').where('id', id).delete(); 
        // Se deu tudo certo ele vai rodar esse comando.

        return response.status(204).send();
        // 204 e uma resposta de sucesso so que não tem conteudo.

    }
};