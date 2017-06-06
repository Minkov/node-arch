const { GenericDbData } = require('./data/generic.db.data');

const { MongoClient } = require('mongodb');

const test = async () => {
    let db = await MongoClient.connect('mongodb://localhost/test');
    let data = new GenericDbData(db, 'Items');
    let result = await data.create({ text: 'Coki' });
    console.log(result);

    let items = await data.getAll();
    console.log(items);
};

test();



