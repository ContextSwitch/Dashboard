import React, { Component } from "react";
import ReactDOM from "react-dom";
import Search from "../presentational/Search";
import "../../../scss/dashboard.scss";

class SearchContainer extends Component {
    constructor() {
        super();
        this.state = {
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }
    render() {
        
            return ( 
                <div className="section search col-12">
                <Search />
                </div>
            );
    }

}

export default SearchContainer;

const wrapper = document.getElementById("search-container");
wrapper ? ReactDOM.render(<SearchContainer />, wrapper) : false;

