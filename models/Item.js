var Db = require('../models/Db.js'); 

class Item{
    constructor(data){
        this.itemId = data.itemId;
        this.itemTitle = data.itemTitle;
        this.itemUrl = data.itemUrl;
        this.active = data.active;
        this.documentId = data.documentId;
    }

    save(){
        
    }
}

let ItemFactory = {

    async loadForDocument(documentId){
        let sql = 'select * from item where active = 1 and documentId = ' + documentId;
        let result = await Db.query(sql);

        let response = [];
        for(let i in result){
            response[i] = new Item(result[i]);
        }
        
        return response;
    },

    create(data){
        return new Item(data);
    }

};

module.exports = ItemFactory;
