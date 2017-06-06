const express = require('express');
const bodyParser = require('body-parser');

const ItemsController = require('./controllers/items.controller')
    .ItemsController;
const BaseRouter = require('./routers/base.router').BaseRouter;

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'pug');

new BaseRouter('/items', new ItemsController())
    .attachToApp(app);

const port = 3001;
app.listen(port, () => console.log(`App runnig at :${port}`));
