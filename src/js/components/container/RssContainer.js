import React, { Component } from "react";
import ReactDOM from "react-dom";
import RSS from "../presentational/RSS";
class RssContainer extends Component {
  constructor() {
    super();
    this.initialize();
    this.state = {
      seo_title: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }
  render() {


    const { seo_title } = this.state;
    return (
      <form id="article-form">
        <RSS
          text="SEO title"
          label="seo_title"
          type="text"
          id="seo_title"
          value={seo_title}
          handleChange={this.handleChange}
        />
      </form>
    );
  }
  initialize() {
    let feeds = fetch('http://54.210.221.137:8000/getFeed?feedId=1').then( results => {
	console.log('results = ');
	console.log(results);
	return results;
    });
  }
}
export default RssContainer;

const wrapper = document.getElementById("rss-container");
wrapper ? ReactDOM.render(<RssContainer />, wrapper) : false;

