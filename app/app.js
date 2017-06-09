const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const { port, connectionString } = require('./config');

const { MongoDb } = require('./db');

const { ItemsController } = require('./controllers/views/items.controller');
const { UsersController } = require('./controllers/views/users.controller');
const { CookiesController } = require('./controllers/views/cookies.controller');
const { CookiesApiController } =
    require('./controllers/api/cookies.api.controller');

const { routers, Router } = require('./routers');
const { UsersRouter } = require('./routers/users.router');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'pug');

app.use('/static', express.static(path.join(__dirname, 'static')));
app.use('/libs', express.static(path.join(__dirname, 'node_modules')));

app.get('/', (req, res) => {
    return res.render('home');
});

const initApp = async () => {
    let dbProvider = new MongoDb();
    let db = await dbProvider.connect(connectionString);

    routers.initWith(app)
        .attach({
            at: '/items',
            router: new Router(new ItemsController(db)),
        })
        .attach({
            at: '/users',
            router: new UsersRouter(new UsersController(db)),
        })
        .attach({
            at: '/cookies',
            router: new Router(new CookiesController(db)),
        })
        .attach({
            at: '/api/cookies',
            router: new Router(new CookiesApiController(db)),
        });
};

initApp()
    .then(() => {
        app.listen(port, () => console.log(`App runnig at :${port}`));
    });
