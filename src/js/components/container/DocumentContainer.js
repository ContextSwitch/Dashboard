import React, { Component } from "react";
import ReactDOM from "react-dom";
import Document from "../presentational/Document";
import Item from "../presentational/Item";
import ItemAdd from "../presentational/ItemAdd";
import "../../../scss/dashboard.scss";
var config = require('config')

class DocumentContainer extends Component {
    constructor() {
        super();
        this.state = {
          documents: []
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }

    addItem(){
        
    }

    render() {
        var $this = this;
        const {documents} = this.state;

        let docList = documents.map(function(doc){
            let itemList = $this.getItems(doc);

            if(doc.documentType == 'rss' || doc.documentType == 'atom'){
                itemList = itemList.slice(0, config.display.itemsPerDocument);
            }
        
            return ( 
                <div className="section col-lg-3 col-xs-12">
                <Document
                    name={doc.documentName}
                    url={doc.documentUrl}
                />

                {itemList.map(item => (
                    <Item
                      url={item.dashboardUrl}
                      title={item.title}
                    />
                ))}
                { doc.documentType == 'links' && <ItemAdd/>}
                </div>
            );
        });

        return docList;
    }

    addItem(){
        alert('adding item');
    }

    getItems(doc){
        let itemList = [];        

        switch(doc.documentType){
            case "rss":
                itemList = this.getRssItems(doc);
                break;
            case "atom":
                itemList = this.getAtomItems(doc);
                break;
            case "links":
                itemList = this.getLinkItems(doc);
                break;
        }

        return itemList;
    }

    getLinkItems(doc){
        let itemList = [];

        itemList = doc.content;
        for(let i in itemList){
            itemList[i].dashboardUrl = itemList[i].itemUrl;
            itemList[i].title = itemList[i].itemTitle;
        }


        return itemList;
    }

    getRssItems(doc){
        let itemList = [];
        let channel = doc.content.rss.channel[0];
        itemList = channel.item;

        for(let i in itemList){
            itemList[i].dashboardUrl = itemList[i].link[0];
        }

        return itemList;
    }

    getAtomItems(doc){
        let itemList = [];
        itemList = doc.content.feed.entry;
        console.log(doc);

        for(let i in itemList){

            let item = itemList[i];
            item.dashboardUrl = item.link[0].$.href;

            if(Array.isArray(item.title)){

                if(typeof item.title[0] == 'object'){
                    item.title = item.title[0]._;
                }
            }
        }
        return itemList;
    }
  componentDidMount() {
    	fetch('http://34.234.76.185:8000/getAllDocuments')
	.then( results => results.json())
	.then(data => {
	    this.setState({documents:data});
        });
  }
}

export default DocumentContainer;

const wrapper = document.getElementById("main-container");
wrapper ? ReactDOM.render(<DocumentContainer />, wrapper) : false;

