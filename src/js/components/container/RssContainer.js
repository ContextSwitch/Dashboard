import React, { Component } from "react";
import ReactDOM from "react-dom";
import RSS from "../presentational/RSS";
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

    const { feeds} = this.state;

    let feedList = feeds.map(function(feed){
	return <form id="article-form">
        <RSS
          text="Feed Url"
          label="feedUrl"
          type="text"
          id="feedUrl"
          value={feed.feedUrl}
        />
      </form>
    })

    return <div>{feedList}</div>
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

const wrapper = document.getElementById("rss-container");
wrapper ? ReactDOM.render(<RssContainer />, wrapper) : false;

