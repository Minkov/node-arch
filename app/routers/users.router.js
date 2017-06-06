const { BaseRouter } = require('./base.router');
const express = require('express');

class UsersRouter extends BaseRouter {
    constructor(prefix, controller) {
        super(prefix, controller);
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

    attachToApp(app, router) {
        if (!router) {
            router = new express.Router();
        }

        this.additionalRoutes.forEach((route) => {
            router[route.method](route.link, route.callback);
        });

        super.attachToApp(app, router);

        return this;
    }
}

module.exports = { UsersRouter };
