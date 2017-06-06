const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const { ItemsController } = require('./controllers/items.controller');
const { UsersController } = require('./controllers/users.controller');

const { BaseRouter } = require('./routers/base.router');
const { UsersRouter } = require('./routers/users.router');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'pug');

app.use('/static', express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
    return res.render('home');
});

new BaseRouter('/items', new ItemsController())
    .attachToApp(app);

new UsersRouter('/users', new UsersController())
    .attachToApp(app);

const port = 3001;
app.listen(port, () => console.log(`App runnig at :${port}`));
