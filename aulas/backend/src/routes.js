const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.required()
    })
}), SessionController.create);

routes.get('/ongs', OngController.index);

/*
    Query
    Route
    Body
*/

routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),   // Aqui eu estou falando que o nome precisa ser uma String e é Obrigatorio colocar alguma coisa.
        email: Joi.string().required().email(),  // O .email ele vai verificar sem tem o @ e o .com alguma coisa.
        whatsapp: Joi.string().required().min(10).max(11),   // No min tem que ter 10 numeros e no maximo tem que ter 11 numeros.
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)   // O .length ta falando que ele tem que ter apenas 2 letras.
    })
}), OngController.create);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({    // Eu vou valitar o headers da minha requisição.   
        authorization: Joi.string().required(),
    }).unknown(),       // No header e um pouco diferente, porque nós não sabemos quandos headers vão ter...       
}), ProfileController.index);

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), IncidentController.index);

routes.post('/incidents', celebrate({
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required(),
    }),
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),  
}), IncidentController.create);

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), IncidentController.delete);

module.exports = routes;