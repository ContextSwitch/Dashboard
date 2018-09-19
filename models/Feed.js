var Db = require('../models/Db.js'); 
var parseString = require('xml2js').parseString;


class Feed{
    constructor(data) {
        this.feedId = data.feedId;
        this.feedUrl = data.feedUrl;
        this.feedName = data.feedName;
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
}


let FeedFactory = {

    loadAll: async () => {
	let sql = 'select * from feed';
	let result = await Db.query(sql);
	let response = [];

	for(i in result){
	    let feed = new Feed(result[i]);
	    await feed.parseContent();
	    response[i] = feed;
	    
	}

	return response;	
    },

    load: async (feedId) => {
	let sql = `select * from feed where feedId = ${feedId}`;
	let result = await Db.query(sql);
	let response = new Feed(result[0]);

	console.log(response);
	return response;	
	
    }

}

module.exports = FeedFactory;
