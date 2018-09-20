import React, { Component } from "react";
import ReactDOM from "react-dom";
import Document from "../presentational/Document";
import Item from "../presentational/Item";
import "../../../scss/dashboard.scss";

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
    render() {
        var $this = this;
        const {documents} = this.state;

        let docList = documents.map(function(doc){
            let itemList = $this.getItems(doc);
        
            return ( 
                <div className="section col-lg-3 col-xs-12">
                <Document
                    name={doc.documentName}
                    url={doc.documentUrl}
                />

                {itemList.slice(0,10).map(item => (
                    <Item
                      url={item.dashboardUrl}
                      title={item.title}
                    />
                ))}
                </div>
            );
        });

        return docList;
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

        for(let i in itemList){
            itemList[i].dashboardUrl = itemList[i].link[0].$.href;
        }
        return itemList;
    }
  componentDidMount() {
    	fetch('http://54.210.221.137:8000/getAllDocuments')
	.then( results => results.json())
	.then(data => {
	    this.setState({documents:data});
        });
  }
}

export default DocumentContainer;

const wrapper = document.getElementById("main-container");
wrapper ? ReactDOM.render(<DocumentContainer />, wrapper) : false;

