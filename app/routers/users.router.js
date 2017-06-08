const { Router } = require('./routers');
const express = require('express');

class UsersRouter extends Router {
    constructor(controller) {
        super(controller);
        this.additionalRoutes = [{
            method: 'get',
            link: '/sign-up',
            callback: (req, res) => controller.signUpForm(req, res),
        }, {
            method: 'post',
            link: '/sign-up',
            callback: (req, res) => controller.signUp(req, res),
        }];
    }

    attachToApp(app, route, router) {
        if (!router) {
            router = new express.Router();
        }

        this.additionalRoutes.forEach((route) => {
            router[route.method](route.link, route.callback);
        });

        super.attachToApp(app, route, router);

        return this;
    }
}

module.exports = { UsersRouter };
