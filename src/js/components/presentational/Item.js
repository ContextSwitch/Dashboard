import React from "react";
import PropTypes from "prop-types";
const Item = ({ title, url}) => (
    <div className="item-container">
        <div className="item-name">
            <a href={url}> {title} </a>
        </div>
    </div>
);
Item.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};
export default Item;
