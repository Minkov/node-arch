const express = require('express');

class RoutersApp {
    constructor(app) {
        this.app = app;
    }

    attach({ at, router }) {
        const route = at;
        router.attachToApp(this.app, route);
        return this;
    }
}

let routers = {
    initWith(app) {
        return new RoutersApp(app);
    },
};

class Router {
    constructor(controller) {
        this.controller = controller;
    }

    attachToApp(app, route, router) {
        if (!router) {
            router = new express.Router();
        }

        router
            .get('/', (req, res) => {
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

        app.use(route, router);
        return this;
    }
}

module.exports = { Router, routers };

