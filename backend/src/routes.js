const express = require('express');
const VendorController = require('./controllers/VendorController');
const ProductController = require ('./controllers/ProductController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');
const routes = express.Router();
const { celebrate, Joi, Segments } = require('celebrate');

routes.get('/vendors', VendorController.index)
routes.post('/vendors', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}) , VendorController.create)

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required(),
    }).unknown()
}), ProfileController.index);


routes.post('/products', celebrate({
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required(),
    })
}), ProductController.create);
routes.get('/products', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}),ProductController.index);
routes.delete('/products:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), ProductController.delete)

routes.post('/sessions', SessionController.create)

module.exports = routes;