import React, { Component } from "react";
import ReactDOM from "react-dom";
import RSS from "../presentational/RSS";
import Item from "../presentational/Item";
import "../../../scss/dashboard.scss";

class RssContainer extends Component {
    constructor() {
        super();
        this.state = {
          feeds: []
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }
    render() {
        var $this = this;
        const {feeds} = this.state;
        console.log(feeds);

        let feedList = feeds.map(function(feed){
            let itemList = $this.getItems(feed);
        
            return ( 
                <div className="feed col">
                <RSS
                    name={feed.feedName}
                    url={feed.feedUrl}
                />

                {itemList.map(item => (
                    <Item
                      url={item.dashboardUrl}
                      title={item.title}
                    />
                ))}
                </div>
            );
        });

        return feedList;
    }

    getItems(feed){
        let itemList = [];        

        if(typeof feed.content.rss != "undefined"){
            itemList = this.getRssItems(feed);
        }
        else if(typeof feed.content.feed != "undefined"){
            itemList = this.getAtomItems(feed);
        }

        return itemList;
    }

    getRssItems(feed){
        let itemList = [];
        let channel = feed.content.rss.channel[0];
        itemList = channel.item;

        for(let i in itemList){
            itemList[i].dashboardUrl = itemList[i].link[0];
        }

        return itemList;
    }

    getAtomItems(feed){
        let itemList = [];
        itemList = feed.content.feed.entry;

        for(let i in itemList){
            itemList[i].dashboardUrl = itemList[i].link[0].$.href;
        }
        return itemList;
    }
  componentDidMount() {
    	fetch('http://54.210.221.137:8000/getAllFeeds')
	.then( results => results.json())
	.then(data => {
	    this.setState({feeds:data});
        });
  }
}

export default RssContainer;

const wrapper = document.getElementById("main-container");
wrapper ? ReactDOM.render(<RssContainer />, wrapper) : false;

