var Db = require('../models/Db.js'); 
var ItemFactory = require('../models/Item.js');
var parseString = require('xml2js').parseString;


class Document{
    constructor(data) {
        this.documentId = data.documentId;
        this.documentUrl = data.documentUrl;
        this.documentName = data.documentName;
        this.documentType = data.documentType;
        this.rawxml = data.content;
        this.content;
    }

    async parseContent(){
        var $this = this;

        let content = await parseString(this.rawxml, function (err, result) {
            if(typeof result == "undefined"){
                result = {};
            }
            $this.content = result;
        });
    }
    
    async loadItems(){
        let sql = 'select * from item where active = 1 and documentId = ' + this.documentId;
        let result = await Db.query(sql);

        let items = await ItemFactory.loadForDocument(this.documentId);

        this.content = items;
    }

    save(){
    
    }
}


let DocumentFactory = {

    loadAll: async () => {
        let sql = 'select * from document where active = 1';
        let result = await Db.query(sql);
        let response = [];

        for(i in result){
            let doc = new Document(result[i]);

            switch(doc.documentType){
                case 'rss':
                case 'atom':
                    await doc.parseContent();
                    break;
                case 'links':
                    await doc.loadItems();
                    break;
            }
            response[i] = doc;
        }

        return response;	
    },

    load: async (documentId) => {
        let sql = `select * from document where documentId = ${documentId}`;
        let result = await Db.query(sql);
        let response = new Document(result[0]);

        return response;	
    }

}

module.exports = DocumentFactory;
