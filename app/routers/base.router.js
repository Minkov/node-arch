const express = require('express');

class BaseRouter {
    constructor(prefix, controller) {
        this.prefix = prefix;
        this.controller = controller;
    }

    attachToApp(app) {
        let router = new express.Router();
        router.get('/', (req, res) => {
            this.controller.listAll(req, res);
        })
            .get('/form', (req, res) => {
                this.controller.getForm(req, res);
            })
            .get('/:id', (req, res) => {
                this.controller.details(req, res);
            })
            .post('/', (req, res) => {
                this.controller.create(req, res);
            });

        this.controller.additionalRoutes.forEach((route) => {
            router[route.method](route.link, route.callback);
        });

        app.use(this.prefix, router);
        return this;
    }
}

module.exports = { BaseRouter };

