const express = require('express'); 
const cors = require('cors');
const routes = require('./routes');

const app = express();  // E onde vai amazenar a nossa aplicação.

app.use(cors());
app.use(express.json());    // Ele vai transforma em algum entendivel.
app.use(routes);
// E importante que o routes fique abaixo do express.json

app.listen(3333); 