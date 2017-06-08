const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const { ItemsController } = require('./controllers/items.controller');
const { UsersController } = require('./controllers/users.controller');
const { CookiesController } = require('./controllers/cookies.controller');

const { BaseRouter } = require('./routers/base.router');
const { UsersRouter } = require('./routers/users.router');

const { GenericDbData } = require('./data/generic.db.data');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'pug');

app.use('/static', express.static(path.join(__dirname, 'static')));

const initApp = async () => {
    const { MongoClient } = require('mongodb');
    let db = await MongoClient.connect('mongodb://localhost/items-2');
    let { Item } = require('./models/item.model');
    let itemsData = new GenericDbData(db, Item);
    // let usersData = new GenericDbData(db, 'Users');
    new BaseRouter('/items', new ItemsController(itemsData))
        .attachToApp(app);

    // new UsersRouter('/users', new UsersController(usersData))
    //     .attachToApp(app);

    // new BaseRouter('/cookies', new CookiesController())
    //     .attachToApp(app);

    app.get('/', (req, res) => {
        return res.render('home');
    });
};

const port = 3001;
app.listen(port, () => console.log(`App runnig at :${port}`));

initApp();
