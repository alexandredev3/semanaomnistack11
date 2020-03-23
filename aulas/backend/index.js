const express = require("express"); 

const app = express();  // E onde vai amazenar a nossa aplicação.

app.get('/', (resquest, response) => {
    return response.json({
        evento: 'Semana OmniStack',
        aluno: 'Alexandre'
    });
});

app.listen(3333, () => {
    console.log('server is running...')
});