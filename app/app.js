const express = require('express');

const Data = require('./data').Data;

let app = express();

app.set('view engine', 'pug');

const data = new Data();

app.get('/', async (req, res) => {
    let items = await data.getAll();
    return res.send(items);
});

const port = 3001;
app.listen(port, () => console.log(`App runnig at :${port}`));
