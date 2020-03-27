# SEMANA OMNISTACK 11.0 

## BACK-END

- INSTALANDO DEPENDECIAS:

    [ x ] npm init -y ele cria um arquivo package.json.

    [ x ] npm install express e uma micro firework responsavel por fazer rotas. 

- CRIANDO ARQUIVOS:

    [ x ] index.js E o nosso documento pricipal tudo vai partir daqui...

## Rota / Recurso

    - Rota: E o caminho do seu site.

    - Recurso: E alguma coisa que nós queremos buscar.

## Métodos HTTP:

    GET: Quando/listar queremos buscar uma informação do backend.(Quando nós acessamos pelo navegador)

    POST: Criar uma informação no backend.

    PUT: Alterar uma informação no backend.

    DELETE: Apagar uma informação no backend.

## Tipos de parâmetros

    Query Params: Parâmetros nomeados enviadas nas rotas após "?" (filtros, paginação)

    Route Paramas: Parâmetros utilizados para identificar recursos. ( São os ID's )

    Request Body: O corpo da requisição, utilizado para criar ou alterar recursos. (email, usuario, senha, etc...)

    ## EXEMPLOS: 

        app.get('/users', (request, response) => {
        const params = request.query

        console.log(params)

        return response.json({
            evento: 'Semana OmniStack',
            aluno: 'Alexandre'
        });
    });

    URL NO INSOMNIA: http://localhost:3333/users/?name=Alexandre&idade=15
                    -> Vai retorna o nome e a idade no terminal...


        app.get('/users', (request, response) => {
        const params = request.query

        console.log(params)

        return response.json({
            evento: 'Semana OmniStack',
            aluno: 'Alexandre'
        });
    });

    URL NO INSOMNIA: http://localhost:3333/users/1
                    -> Vai retorna o id no terminal...


        app.post('/users', (request, response) => {
        const body = request.body;

        console.log(body);

        return response.json({
            evento: 'Semana OmniStack',
            aluno: 'Alexandre'
        });
    });

    * Mude o paramentro do insomnia para JSON
    URL NO INSOMNIA: http://localhost:3333/users
                    -> Vai retorna o JSON do insomnia no terminal...


    
## INSTALANDO NODEMON:

    [ x ] > npm install nodemon -D
            -D quer dizer que nós queremos instalar essa biblioteca so em modo de desenvolvimento.

    - Configurar nodemon 

        --> "test": "echo \"Error: no test specified\" && exit 1" ( APAGAR )

                --> "start": "nodemon src/index.js" ( NO LUGAR DO TEST COLOCAR ESSE CODIGO )

        RODAR O NODEMON: npm start


## BANCO DE DADOS:

    - SLQ: MySql, SqLite, PostgresSQL, Oracle, Microsoft SQL Server.

    - NoSQL: MongoDB, CourchDb, etc...


    - DRIVER: SELECT * FROM users   * Selecionar todas as informações de um usuario.

    - QUERY BUILDER: table('users').select('*').where()     * Vc usa Javascript no banco de dados.

    [ x ] > npm install knex 
        * Vai nos permitir trabalhar com javascript no sqlite

    [ x ] > npm install sqlite3
        * De acordo com o banco de dados que você vai usar.

    [ x ] > npx knex init
        * Ele vai criar um arquivo JS


    - Coloque o caminho da sua routa no knexfile 
        filename: './src/database/db.sqlite'


    - MIGRATIONS: vai manter um historico do nosso banco de dados. (Quando foi criado uma tabela quando vc alterada, etc...)

## CRIANDO NOSSA PRIMEIRA MIGRATION:

    - Crie uma pasta migrations dentro do database.

    - Adcione o migration no knexfile.js

            development: {    // DESEVOLVIMENTO E A QUE NÓS VAMOS USAR.
            client: 'sqlite3',
            connection: {
            filename: './src/database/db.sqlite'
            },

        -->    migrations: {
            directory: './src/database/migrations' 
            }   <--
            
        },

## CRINADO NOSSA MIGRATION DE CRIAÇÃO DE ONGS:

    [ x ] > npx knex migrate:make <b>create_ongs</b>
        
        -> CREATE_ONGS pode ser qualquer coisa mesmo. ( Geralmente o nome e de acordo com a fucionalidade que aquela migration vai ter... )

    - Ele vai dar esse seguinte erro: sqlite does not support inserting default values. Set the `useNullAsDefault` flag to hide this warning. (see docs http://knexjs.org/#Builder-insert).

        * Para resolver isso nós vamos colocar useNullAsDefault como <b>True</b>

                development: {  
                client: 'sqlite3',
                connection: {
                filename: './src/database/db.sqlite'
                },
                migrations: {
                directory: './src/database/migrations'
                },
             -->  useNullAsDefault: true  <--
            },

    - Isso acontece porque o sqlite não suporta valores padrões.

    - exports.up: E reponsavel por criar a migration o que vai acontece quando nós executar essa migration.

    - exports.down: Se acontecer algum problema, o que deve ser feito.

## CRIANDO A TABELA DE CRIAÇÃO DE ONRGS:

    [ X ] > npx knex migrate:latest
        * Comando para criar nossa tabela.

## CRINADO NOSSA MIGRATION DE ACIDENTES:

    [ x ] > npx knex migrate:make create_incidents

    - table.increments(); // Ele vai criar uma chave primaria com alto incremento, toda vez que e criado um novo incident ele vai colocar 1 2 3 ...

    - CHAVE EXTRAGEIRA: toda vez que o ong_id estiver preechido ele precisa estar cadastrado dentro da tabela ONG.

## CRIANDO A TABELA DE CRIAÇÃO DE INCIDENTS:

    [ x ] > npx knex migrate:lastest


    * CASO VC FEZ ALGUMA COISA ERRADA NA MIGRATION VC PODE DESFAZER RODANDO ESSE COMANDO.

        > npx knex migrate:rollback

        > npx knex migrate:status
            - Ele vai mostrar todas as migrations que foram criadas.

        > npx knex 
            - Ele vai mostrar todos os comando disponiveis...


## CADASTRO DE NOVA ONG

    routes.post('/users', (request, response) => {

        * Troque o '/users' para '/ongs' 

    - Teste para saber se o data esta retornando:

        routes.post('/ongs', (request, response) => {
        const { name, email, whatsapp, city, uf } = request.body;
            * Nesse caso estamos usando desestruturação. (Evitar que alguem coloque uma informação que eu não queira)

        console.log(data);

        return response.json();
    });

    URL NO INSOMNIA: http://localhost:3333/ongs
        - Método: POST
        - Parametro body (JSON)

    - BODY: 
        {
            "name": "APAD",
            "email": "contato@apad.com.br",
            "whatsapp": "610000000",
            "city": "Rio do sul",
            "uf": "SC"
        }

        * VAI RETORNA ESSES VALORES NO TERMINAL

## CONECTANDO COM O BANCO DE DADOS:

    - Crie um arquivo connection.js dentro da pasta database.

    const connection = knex(configuration.development)
        - Fazendo a conexão em mode de desenvolvetor

## CRIANDO CONTROLLER DA ONG:

    connection('ongs').insert({    
        id,
        name,
        email,
        whatsapp,
        city,
        uf,
    })
    
        - 'ongs' E a tabela que vc quer conectar

        - insert e para inserir informações.
        
    * Como o insert pode demorar um pouco nós precisamos usar o asycn await.

            routes.post('/ongs', async (request, response) => {
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
        });


        return response.json({ id });
            * Ele vai retorna de resposta o id, porque e com esse id que vai ser usado para se conectar com a nossa aplicação.

        
        const ongs = await connection('ongs').select('*');
            * Quer dizer que vai selecionar todos os registros dentro da tabela ong.


        

        routes.get('/ongs', async (request, response) => {
        const ongs = await connection('ongs').select('*');

        return response.json(ongs);
        });

            * Ele vai retorna array com todos os dados la do banco de dados.



        - INDEX: E o nome que nós damos ao método que faz a listagem de todos os dados de uma tabela.

## CRIANDO CONTROLLER DOS INCIDENTS:

    - HEADER: e tudo aquilo que tem a ver a autenticação

        * A AUTENTICAÇÃO NÃO VAI NO BODY DO INSOMNIA ELE VAI NO HEADER.

    - Authorization: Geralmente e esse nome que determina a autorização (Login)

    * ATENÇÃO: Quando tiver mais que 3 metodos em um controller e recomentado criar um novo controller.

    - SessionController: Geralmente e usada para fazer um login, porque estou criando uma sessão.

## ADCIONANDO O MÓDULO CORS

    - Cors: e um módulo de segurança, ele vai determina quem vai poder acessar a nossa aplicação.

    [ x ] > npm install cors

    - No arquivo index.js:

        const express = require('express'); 
        const cors = require('cors');
        const routes = require('./routes');

        app.use(cors({
            origin: 'http://meuapp.com'
        }));



    - app.use(cors({
    origin: 'http://meuapp.com'
    }));

        * Quando nossa aplicação for pro modo de produção (online), nos precisamos colocar o origin que dizer que so o http://meuapp.com vai ter acesso.

    - app.use(cors())  

        * Como nós so estamos em mode de produção nós so precisamos colocar assim que vai permiter que nosso frontend tenha acesso.

## Valitação no back-end:

    [ x ] > npm install celebrate
        * Biblioteca para fazer valitação

        * Ele integra o join com o express.

        * Por enquanto nós vamos fazer a nossa valitação no arquivo de routes.

        * Nos vamos fazer a nossa valitação na routa de criação e alteração.


        routes.post('/ongs', celebrate(), OngController.create);

            * O celebrate tem que vim antes da criação do controller se não ele vai criar o controller e depois fazer a valitação...

        
        const { errors } = require('celebrate')
            * Ele vai dar aquele erro 500 quando alguem colocar alguma informação errada.

        app.use(errors());

        ** Coloque ele dentro do index.js

         O key que ele retorna da pra mexer nele la no front-end...

## Testes no back-end:

    - TDD ( Test-driven Development )

## Configurando jest

    - Serve para fazer testes na parte do front-end reactJS React Native.

    [ x ] > npm install jest -D

    > npx jest --init

            The following questions will help Jest to create a suitable configuration for your project

            √ Would you like to use Jest when running "test" script in "package.json"? ... yes
            √ Choose the test environment that will be used for testing » node
            √ Do you want Jest to add coverage reports? ... no
            √ Automatically clear mock calls and instances between every test? ... yes
        

    - Crie uma pasta chamada tests


## Tipos de testes:

    INTEGRATION: Ele testa uma parte da sua aplicação de uma forma muito isolada.

    UNIT: Ele testa por completo uma funcionabilidade da nossa aplicação e de rotas,
    ele testa uma coisa muito espesifica muito isolada. por isso que nós separamos o nosso id de acesso, ele não mexe em banco de dados ele so teste algo que e unico dentro da nossa aplicação.

    - > npm test 
        * Para executar os testes.

## Cnfigurando banco de dados para testes:

    test: {     // Configurando para testes.
    client: 'sqlite3',
    connection: {
      filename: './src/database/test.sqlite'  * Trocar db para test
    },
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault: true
  },

    * No arquivo knexfile.js


    [ x ] > npm install cross-env



    "scripts": {
    "start": "nodemon src/index.js",
    "test": "cross-env NODE_ENV=test jest"   <--
    },

        * La no package.json colocar isso no test  "cross-env NODE_ENV=test jest"

    ** Agora quando nós temos uma variavel para iniciar em ambiente de teste.


        const config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development ;

            * No connection.js coloque isso para ter acesso a isso.

## Configurando o supertest

    [ x ] > npm install supertest -D 
        * Alem de fazer chamadas api ele vai trazer alguma valitações a mais para nós.

    ** Dentro da pasta src crie um arquivo server.js, e mute o index.js por app.js (Não esqueça de trocar o caminho do nodemon para server);

    


