import React from "react";
import PropTypes from "prop-types";
const ItemAdd = ({}) => (
    <div className="add-item-container">
        <h6> Add New Link </h6>
        <div className="item-name">
            <input name="item-title" placeholder="title"/>
        </div>
        <div>
            <input name="item-url" placeholder="url"/>
        </div>
        <div>
            <button>Add Item</button>
        </div>
    </div>
);
ItemAdd.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};
export default ItemAdd;
