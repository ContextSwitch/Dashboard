import React from "react";
import PropTypes from "prop-types";
const Search = ({ }) => (
    <div className="search-container">
        <form action="https://www.google.com/search" class="searchform" method="get" name="searchform" target="_blank">
        <input autocomplete="on" class="form-control search" name="q" placeholder="Google" required="required"  type="text" />
        <button class="button" type="submit">Search</button>
        </form>
    </div>
);
Search.propTypes = {
};
export default Search;
