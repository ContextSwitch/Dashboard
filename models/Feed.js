var Db = require('../models/Db.js'); 

class Feed{
  constructor(data) {
	this.feedId = data.feedId;
	this.feedUrl = data.feedUrl;
	this.cache = data.cache;
  }
}


let FeedFactory = {

    loadAll: async () => {
	let sql = 'select * from feed';
	let result = await Db.query(sql);
	let response = [];

	for(i in result){
	    response[i] = new Feed(result[i]);
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
