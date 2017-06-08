const { Cookie } = require('./models/cookie.model');
const { Item } = require('./models/item.model');

let model = new Item();
model.id = 5;
model.name = 'Cookie';
model.size = 123;

console.log(model.toDocument());
console.log(Item.fromDocument(model.toDocument()));
