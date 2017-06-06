let items = [{
    id: 'e871b49b-4ae9-49f0-9785-87eb6533a796',
    text: 'Coki',
}];

const uuid = require('uuid');

class ItemsData {
    async getAll() {
        return items;
    }

    async create(item) {
        item.id = uuid.v4();
        items.push(item);
        return item;
    }

    async getById(id) {
        return items.find((item) => item.id === id);
    }
}

module.exports = { ItemsData };
